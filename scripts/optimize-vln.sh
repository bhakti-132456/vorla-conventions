#!/bin/bash

# This script optimizes the videos for the Vorla Laxmi Narsamma virtual tour.
# It reduces resolution to 720p, lowers bitrate for smooth scrubbing, and removes audio.

V_DIR="public/videos/virtual-tour/vorla-laxmi-narsamma"
TMP_DIR="$V_DIR/tmp_optimized"
mkdir -p "$TMP_DIR"

OPTS="-vcodec libx264 -crf 28 -preset slow -pix_fmt yuv420p -vf scale=1280:-2 -an -movflags +faststart"

optimize() {
    local src="$1"
    local dest="$2"
    if [ -f "$V_DIR/$src" ]; then
        echo "Optimizing $src..."
        ffmpeg -y -i "$V_DIR/$src" $OPTS "$TMP_DIR/$dest"
        ffmpeg -y -i "$V_DIR/$src" -frames:v 1 -q:v 5 "$TMP_DIR/${dest%.mp4}-poster.jpg"
    else
        echo "Skip: $src not found"
    fi
}

# Mapping
optimize "1-day-night.mp4" "1-exterior.mp4"
optimize "2-walk-in.mp4" "2-parking.mp4"
optimize "3-entrance-lobby.mp4" "3-lobby.mp4"
optimize "4-0-interior.mp4" "4-interior-bare.mp4"
optimize "4-1-decorated.mp4" "5-interior-decorated.mp4"
optimize "5-courtyard-lobby.mp4" "6-courtyard-lobby.mp4"
optimize "6-makeup.mp4" "7-changing-rooms.mp4"
optimize "7-bridal-room.mp4" "8-bridal-room.mp4"
optimize "8-dining.mp4" "9-dining.mp4"
optimize "9-courtyard.mp4" "10-courtyard.mp4"
optimize "10-sanitation.mp4" "11-sanitation.mp4"
optimize "11-banquet.mp4" "12-banquet.mp4"

echo "Moving optimized files..."
mv "$TMP_DIR"/* "$V_DIR/"
rmdir "$TMP_DIR"

echo "Done!"
