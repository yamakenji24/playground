#!/bin/bash

# Set tag name
IMAGE_TAG="$(date +"%Y.%m.%-d").$(git tag | (grep "^`date +"%Y.%m.%-d"`" || true) | wc -l | awk '{print $1+1}')"
echo "Tag: ${IMAGE_TAG}"

# Get merged PRs
PREV_RELEASE_TAG=$(git describe --abbrev=0 --tags `git rev-list --tags --skip=1 --max-count=1`)
echo "Previous release tag: $PREV_RELEASE_TAG"
PR_LIST=$(gh pr list --state merged --json title,url --jq '.[] | "- [\(.title)](\(.url))"' | grep -A 10000 "$PREV_RELEASE_TAG" | grep -B 10000 "$IMAGE_TAG" | sed "/$PREV_RELEASE_TAG/d" | sed "/$IMAGE_TAG/d")
echo "Merged PRs: $PR_LIST"
