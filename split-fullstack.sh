#!/bin/bash

INPUT="public/videos/fullstack-course.webm"
OUTDIR="public/videos/fullstack"

mkdir -p "$OUTDIR"

split_video () {
  START="$1"
  END="$2"
  NAME="$3"

  echo "Splitting: $NAME"

  ffmpeg -y \
    -ss "$START" \
    -to "$END" \
    -i "$INPUT" \
    -vf "scale=-2:1080" \
    -c:v libx264 \
    -preset veryfast \
    -crf 30 \
    -pix_fmt yuv420p \
    -c:a aac \
    -b:a 96k \
    -movflags +faststart \
    "$OUTDIR/$NAME"
}

split_video "00:00:00" "00:01:27" "01-introduction.mp4"
split_video "00:01:27" "01:04:19" "02-html-and-css.mp4"
split_video "01:04:19" "02:21:01" "03-intro-to-css.mp4"
split_video "02:21:01" "03:32:02" "04-building-a-business-card.mp4"
split_video "03:32:02" "04:17:21" "05-space-exploration.mp4"
split_video "04:17:21" "05:22:25" "06-birthday-website.mp4"
split_video "05:22:25" "05:30:38" "07-hometown-homepage.mp4"
split_video "05:30:38" "06:46:17" "08-counter-app.mp4"
split_video "06:46:17" "07:07:22" "09-javascript-challenges-part-1.mp4"
split_video "07:07:22" "07:19:59" "10-git-and-github-basics.mp4"
split_video "07:19:59" "10:15:19" "11-blackjack-game.mp4"
split_video "10:15:19" "10:41:09" "12-javascript-challenges-part-2.mp4"
split_video "10:41:09" "13:34:25" "13-chrome-extension.mp4"
split_video "13:34:25" "14:00:48" "14-javascript-challenges-part-3.mp4"
split_video "14:00:48" "14:46:27" "15-command-line-basics.mp4"
split_video "14:46:27" "15:12:55" "16-essential-git-and-github-skills.mp4"
split_video "15:12:55" "16:27:18" "17-advanced-foundations.mp4"
split_video "16:27:18" "17:41:43" "18-methods-and-loops.mp4"
split_video "17:41:43" "18:26:57" "19-function-expressions-and-parameters.mp4"
split_video "18:26:57" "19:42:29" "20-asynchronous-javascript-and-apis.mp4"
split_video "19:42:29" "21:19:42" "21-ai-engineering-fundamentals.mp4"
split_video "21:19:42" "22:42:51" "22-build-a-node-api.mp4"
split_video "22:42:51" "24:52:41" "23-build-a-fullstack-node-app.mp4"
split_video "24:52:41" "25:13:25" "24-introduction-to-databases.mp4"
split_video "25:13:25" "26:30:04" "25-writing-sql-queries.mp4"
split_video "26:30:04" "28:48:33" "26-static-pages.mp4"
split_video "28:48:33" "31:03:00" "27-data-driven.mp4"
split_video "31:03:00" "36:17:02" "28-react-state.mp4"
split_video "36:17:02" "38:05:49" "29-side-effects.mp4"
split_video "38:05:49" "40:12:26" "30-capstone-project.mp4"
split_video "40:12:26" "42:15:21" "31-typescript-fundamentals.mp4"
split_video "42:15:21" "43:06:47" "32-typescript-in-react.mp4"
split_video "43:06:47" "45:08:21" "33-build-a-nextjs-app.mp4"

echo "Splitting final lesson: 34-rendering-strategies-and-more.mp4"

ffmpeg -y \
  -ss "45:08:21" \
  -i "$INPUT" \
  -vf "scale=-2:720" \
  -c:v libx264 \
  -preset veryfast \
  -crf 28 \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 96k \
  -movflags +faststart \
  "$OUTDIR/34-rendering-strategies-and-more.mp4"

echo "Done. Files saved in $OUTDIR"
