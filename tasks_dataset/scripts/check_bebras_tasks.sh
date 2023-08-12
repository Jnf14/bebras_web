#! /bin/bash

find . -name "20*.md" -exec sh -c 'bebras check {}' \; > check_tasks.out