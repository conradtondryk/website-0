## **building a todo cli in rust**

---

command-line todo apps are kind of a rite of passage for learning new languages. simple enough to finish in a weekend, but complex enough to hit the important stuff—data persistence, error handling, user input. this is how i built mine in rust.

---

### **what it does**

the app is pretty straightforward. three commands:

- **add** – create new tasks with timestamps
- **remove** – delete tasks by id
- **view** – show all your tasks

everything gets saved to a json file (`list.json`) so your tasks stick around between sessions. super simple interface:

```bash
todo add "Buy groceries"
todo view
todo remove 1
```

---

### **the tech stack**

kept the dependencies minimal but purposeful:

- **clap** (v4.5) – command-line parsing with derive macros
- **serde** (v1.0) + **serde_json** (v1.0) – serialization and json
- **chrono** (v0.4) – datetime handling for timestamps
- **anyhow** (v1.0) – cleaner error handling

---

### **the evolution: 20 commits of refinement**

honestly the most interesting part isn't the final code—it's the git history. watching the mess slowly turn into something clean and idiomatic.

**phase 1: getting it working** _(commits 1-10)_

started with the basics. set up the project, defined the core structs (task and command enums), got json serialization working. early commits are messy—just trying to get something functional. make it work first, make it pretty later.

**phase 2: removing redundancy** _(commits 11-15)_

once it worked, i started cleaning up:
- killed unnecessary loops
- removed redundant code paths
- got rid of pointless clone operations
- pulled save/load logic into their own functions

basically just asked myself "what code here doesn't need to exist?"

**phase 3: structural improvements** _(commits 16-20)_

final phase was deeper changes:
- converted match arms into dedicated methods
- added proper error handling everywhere
- integrated chrono for timestamps
- removed a "complete" feature (less is more)
- restructured around impl blocks
- switched to anyhow for error propagation
- created a unified command handler

---

### **the final architecture**

ended up with just over 100 lines of rust. here's how it's structured:

**type-driven design**

```rust
#[derive(Deserialize, Serialize, Debug)]
struct Task {
    timestamp: DateTime<Local>,
    name: String,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(transparent)]
struct Tasks(Vec<Task>);
```

the `Tasks` newtype wrapper gives a clean api while using rust's type system. the `#[serde(transparent)]` attribute makes it serialize as a simple json array.

**command pattern with enums**

```rust
#[derive(Subcommand)]
enum Command {
    Add { name: String },
    Remove { id: usize },
    View,
}

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

this pattern gives exhaustive matching—the compiler forces you to handle every command. the `handle` method follows a clean load-modify-save pattern.

**error handling**

using anyhow's `Result` type and the `bail!` macro for early returns:

```rust
fn add(&mut self, name: &str) -> Result<()> {
    if name.is_empty() {
        bail!("Name cannot be empty.");
    }
    // ... rest of implementation
}
```

errors propagate cleanly with the `?` operator. main function returns `Result<()>`, automatically printing errors to stderr.

**smart file handling**

```rust
fn load() -> Result<Self> {
    match fs::read_to_string("list.json") {
        Ok(data) => serde_json::from_str(&data).map_err(Into::into),
        Err(e) if e.kind() == ErrorKind::NotFound => Ok(Tasks(vec![])),
        Err(e) => Err(e.into()),
    }
}
```

the load function handles the first-run case gracefully—if there's no json file yet, it just returns an empty task list instead of erroring out.

---

### **what i learned**

honestly the biggest takeaway is that good software is more about deleting code than writing it. the git history shows the progression: make it work → make it right → make it simple.

also rust's type system is incredible for this kind of thing. once the types compile, the logic usually just works. the compiler catches so much.

---

### **wrapping up**

the final app does one thing well: manage tasks from the command line. it's fast, reliable, and maintainable. sometimes that's all you need.

---

**repository**: [github.com/conradtondryk/todo-project](https://github.com/conradtondryk/todo-project)
**lines of code**: ~105
**commits**: 20+
