## **building a todo cli in rust.**

---

## **why build another todo app.**


every developer has built a todo app at some point. it's the "hello world" of real applications—simple enough to finish, complex enough to be useful. when learning rust, i wanted a project that would teach me about the ecosystem, error handling, and how to write clean, idiomatic code.

---

## **what it does.**


a minimal command-line tool for managing tasks. three commands, zero configuration:

```
todo add "buy groceries"
todo view
todo remove 1
```

tasks persist to json and include timestamps. that's it. no databases, no web servers, no bloat.

---

## **the stack.**


**clap** — command-line parsing with derive macros
**serde + serde_json** — data serialization
**chrono** — timestamp handling
**anyhow** — error handling that doesn't make you cry

---

## **the journey.**


the git history tells the real story: 20+ commits of relentless refactoring. from working-but-messy to clean-and-simple. the process went like this:

**build it** → make it work with basic functionality
**clean it** → remove loops, clones, and redundant code
**refactor it** → extract methods, improve structure, add proper errors
**polish it** → simplify, remove features, make it elegant

sometimes the best code is the code you delete.

---

## **the interesting bits.**


### **→ smart file loading.**


the first-run experience matters. instead of crashing when `list.json` doesn't exist, the app gracefully initializes with an empty list:

<div style="background-color: #f6f8fa; padding: 16px; border-radius: 6px; border-left: 4px solid #0366d6; margin: 20px 0;">

```rust
fn load() -> Result<Self> {
    match fs::read_to_string("list.json") {
        Ok(data) => serde_json::from_str(&data).map_err(Into::into),
        Err(e) if e.kind() == ErrorKind::NotFound => Ok(Tasks(vec![])),
        Err(e) => Err(e.into()),
    }
}
```

</div>

this pattern handles three cases: successful load, missing file, and actual errors. no crashes, no confusing messages for new users.

### **→ the command handler.**


early versions had scattered logic with repeated patterns. the final version centralizes everything in one clean handler:

<div style="background-color: #f6f8fa; padding: 16px; border-radius: 6px; border-left: 4px solid #22863a; margin: 20px 0;">

```rust
impl Command {
    fn handle(self) -> Result<()> {
        let mut tasks = Tasks::load()?;

        match self {
            Command::Add { name } => {
                tasks.add(&name)?;
                tasks.save()?;
            }
            Command::Remove { id } => {
                tasks.remove(id)?;
                tasks.save()?;
            }
            Command::View => {
                tasks.view();
            }
        }
        Ok(())
    }
}
```

</div>

load → execute → save. the pattern is obvious. the `?` operator handles errors. the compiler ensures every command is handled. this is what good rust looks like.

### **→ validation that fails fast.**


better to catch mistakes immediately than persist bad data:

<div style="background-color: #f6f8fa; padding: 16px; border-radius: 6px; border-left: 4px solid #d73a49; margin: 20px 0;">

```rust
fn add(&mut self, name: &str) -> Result<()> {
    if name.is_empty() {
        bail!("Name cannot be empty.");
    }
    self.0.push(Task {
        name: name.to_string(),
        timestamp: Local::now(),
    });
    println!("{name} added!");
    Ok(())
}
```

</div>

the `bail!` macro from anyhow makes early returns clean. no pyramids of if-statements, no result wrapping ceremonies.

---

## **what i learned.**


- refactoring is more valuable than getting it right the first time. the messy working version taught me what the clean version should look like.
- rust's type system catches so many bugs at compile time. the exhaustive match on commands means i can't forget to handle a case.
- sometimes removing features is the right move. i had a "complete" command that added complexity without adding value.
- error handling with anyhow made the code so much cleaner. no more nested result wrapping.
- small commits with clear messages make it easier to understand your own thought process later.
- clippy is harsh but it makes you write better rust. the pedantic lint caught patterns i didn't know were bad.
- simplicity is hard. it took 20+ commits to make this simple.
- simplicity means scalability. tidy, well-organised code is much easier to work with and implement features on. for next time i'd prioritise making it as clean as possible before focusing on new features, maybe making a plan of what i intend to make down the line to help design it.


---

## **final thoughts.**


good software isn't about adding features—it's about removing everything that doesn't need to exist. this project started messy and became simple through careful refactoring.

the best part? the final version is easier to understand, easier to maintain, and harder to break than the first working draft. it's more future proof too, with this clean frame i can much more easily add and change things as i need. i'll be improving on this project over time as i get more experience and ideas.

---

