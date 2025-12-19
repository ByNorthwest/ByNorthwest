---
title: "Understanding Rust Ownership"
excerpt: "Breaking down the borrow checker and ownership model for beginners."
date: "2023-11-10"
tags: ["rust", "programming", "learning"]
published: true
---

# Rust Ownership

Ownership is Rust's most unique feature. It enables memory safety guarantees without a garbage collector.

## The Rules

1. Each value in Rust has a variable that's called its owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    // println!("{}", s1); // Error!
}
```

It takes time to get used to, but it's worth it.
