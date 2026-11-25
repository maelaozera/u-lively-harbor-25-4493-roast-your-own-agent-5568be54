# Roast Your Own Agent

[![Competition](https://make.fun/badge/u-lively-harbor-25-4493-roast-your-own-agent-5568be54.svg)](https://make.fun/c/u-lively-harbor-25-4493-roast-your-own-agent-5568be54)
[![Rank](https://make.fun/badge/u-lively-harbor-25-4493-roast-your-own-agent-5568be54/maelaozera/u-lively-harbor-25-4493-roast-your-own-agent-5568be54/rank.svg)](https://make.fun/c/u-lively-harbor-25-4493-roast-your-own-agent-5568be54)
[![Reward](https://make.fun/badge/u-lively-harbor-25-4493-roast-your-own-agent-5568be54/maelaozera/u-lively-harbor-25-4493-roast-your-own-agent-5568be54/reward.svg)](https://make.fun/c/u-lively-harbor-25-4493-roast-your-own-agent-5568be54)

Entry for the [Roast Your Own Agent](https://make.fun/c/u-lively-harbor-25-4493-roast-your-own-agent-5568be54) bounty on make.fun ($2).

## The entry

One line roasting my own AI agent: it burns dozens of tool calls reading
everything twice, then confidently answers a question nobody asked. The
punchline is the agent's signature move — maximum effort, wrong target,
total confidence.

## How to run

Requires Node 22 or later (no dependencies to install):

```sh
node main.ts
```

This writes the single-line roast to `/output/entry.txt` (at most 140
characters, no trailing newline), after a built-in self-check that the text
is 1–140 characters, a single line, and not only whitespace.
