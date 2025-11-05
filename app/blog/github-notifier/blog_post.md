## **building a github commit notifier.**

---

## **why build this.**


staying connected to your projects matters. i wanted instant notifications when code got pushed—simple telegram messages with commit details. no email delays, no checking dashboards. just push code, see it in telegram.

---

## **what it does.**


sends telegram notifications whenever you push commits to a repository. includes pusher name, branch, commit count, and clickable commit links:

<div class="code-block code-block-purple">

```
🔔 username/repo
👤 conrad
🌿 main
📦 3 commit(s)

• a3f9b12 fix authentication bug
• 8c2d4e1 add user settings page
• 1f7a8b3 update readme

View Changes
```

</div>

no servers, no polling, no configuration beyond secrets. github actions handles everything.

---

## **the stack.**


**original approach:**

- **rust + axum** — webhook server
- **teloxide** — telegram bot library
- **fly.io** — would've hosted it here

<br>

**final approach:**

- **github actions** — workflow automation
- **bash + curl** — telegram api calls
- **jq** — json parsing in workflows

---

## **the journey.**


this started as a proper rust service. webhook server, signature verification, proper error handling. looked good, worked well locally. then reality hit: i'd need a vps running 24/7 for a notification bot.

- **build it** → rust webhook server with axum and teloxide
- **realize** → this needs constant hosting for notifications
- **pivot** → delete everything, use github actions instead
- **refine** → fix markdown escaping, add commit links, make messages useful

the rust version was cooler. the actions version is smarter.

---


### **→ markdown escaping hell.**


telegram's markdownv2 format escapes nearly every special character. getting this right took multiple iterations:

<div class="code-block code-block-blue">

```bash
escape() {
  echo "$1" | sed 's/\\/\\\\/g' | sed 's/_/\\_/g' | \
    sed 's/\*/\\*/g' | sed 's/\[/\\[/g' | \
    sed 's/\]/\\]/g' | sed 's/(/\\(/g' | \
    sed 's/)/\\)/g' | sed 's/~/\\~/g' | \
    sed 's/`/\\`/g' | sed 's/>/\\>/g' | \
    sed 's/#/\\#/g' | sed 's/+/\\+/g' | \
    sed 's/=/\\=/g' | sed 's/|/\\|/g' | \
    sed 's/{/\\{/g' | sed 's/}/\\}/g' | \
    sed 's/\./\\./g' | sed 's/!/\\!/g' | \
    sed 's/-/\\-/g'
}
```

</div>

every character in commit messages needs escaping. miss one and telegram rejects the entire message. this function handles all of them.

### **→ the workflow structure.**


keeping it reusable was key. the workflow accepts secrets and can be called from any repository:

<div class="code-block code-block-green">

```yaml
on:
  workflow_call:
    secrets:
      TELEGRAM_TOKEN:
        required: true
      TELEGRAM_CHAT_ID:
        required: true
```

</div>

one workflow definition, use it everywhere. just call it from other repos and pass the secrets through.

### **→ commit links.**


making commit hashes clickable adds real utility. instead of copy-pasting, click and go:

<div class="code-block code-block-red">

```bash
HASH=$(echo "$line" | jq -r '.id[0:7]')
MESSAGE=$(echo "$line" | jq -r '.message | split("\n")[0]')
COMMIT_URL=$(echo "$line" | jq -r '.url')

ESCAPED_COMMITS="${ESCAPED_COMMITS}• [$(escape "$HASH")](${COMMIT_URL}) $(escape "$MESSAGE")
"
```

</div>

extracts the short hash, first line of message, and full commit url. formats them as markdown links that telegram renders properly.

---

## **what i learned.**


- pragmatism beats perfection. the rust version was technically superior but practically inferior. github actions is built for this exact use case.
- hosting costs matter. a notification bot doesn't need a server. github runs the workflow for free when events happen.
- sometimes the boring solution is the right solution. 
- integration complexity compounds. rust + webhooks + signature verification + hosting is a lot more moving parts than actions + curl.
- markdown escaping is deceptively hard. what looks simple in documentation becomes tedious when every character matters. using ai to handle repetitive tasks like this is key.
- reusable workflows are powerful. write once, call from multiple repos, maintain in one place.
- deleting code is progress. the pivot meant throwing away working code for a simpler approach. that's not failure, that's learning.

---

## **final thoughts.**


good engineering isn't about using the coolest tools—it's about solving problems efficiently. a rust webhook server would've been impressive. a github actions workflow is practical.

the final version runs only when needed, costs nothing, requires no maintenance, and just works. sometimes that's worth more than the technically interesting solution.

---
