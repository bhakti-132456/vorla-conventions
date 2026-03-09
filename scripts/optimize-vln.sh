#!/bin/bash

# PRO-SCRUB OPTIMIZATION SCRIPT
# This script encodes videos with All-Intra (GOP 1) which makes every frame a keyframe.
# This ensures perfect, jitter-free scrubbing even on mobile/older devices.
# Resolution is kept at 1080p and CRF 20 for high visual fidelity.

V_DIR="public/videos/virtual-tour/vorla-laxmi-narsamma"
TMP_DIR="$V_DIR/tmp_pro_optimized"
mkdir -p "$TMP_DIR"

# All-Intra Settings:
# -g 1: Every frame is a keyframe (critical for scrubbing)
# -crf 20: High quality (lower is better, 18-22 is transparent)
# -tune fastdecode: Optimizes for player performance
OPTS="-vcodec libx264 -crf 20 -g 1 -preset slow -pix_fmt yuv420p -an -movflags +faststart -tune fastdecode"

optimize() {
    local src="$1"
    local dest="$2"
    if [ -f "$V_DIR/$src" ]; then
        echo "Optimizing $src -> $dest..."
        ffmpeg -y -i "$V_DIR/$src" $OPTS "$TMP_DIR/$dest"
        # High quality poster
        ffmpeg -y -i "$V_DIR/$src" -frames:v 1 -q:v 2 "$TMP_DIR/${dest%.mp4}-poster.jpg"
    else
        echo "Skip: $src not found"
    fi
}

# Mapping originals added by user
optimize "1-day-night.mp4" "1-exterior.mp4"
optimize "1-exterior.mp4" "1-exterior.mp4"  # Added this for direct updates
optimize "walk-in.mp4" "2-parking.mp4"
optimize "entrance-lobby.mp4" "3-lobby.mp4"
optimize "4-0-VORLA-NEW-HALL-interior.mp4" "4-interior-bare.mp4"
optimize "decorated-vln.mp4" "5-interior-decorated.mp4"
optimize "courtyard-lobby.mp4" "6-courtyard-lobby.mp4"
optimize "makeup.mp4" "7-changing-rooms.mp4"
optimize "bridal room.mp4" "8-bridal-room.mp4"
optimize "catering.mp4" "9-dining.mp4"
optimize "courtyard.mp4" "10-courtyard.mp4"
optimize "sanitation.mp4" "11-sanitation.mp4"
optimize "banquet.mp4" "12-banquet.mp4"

echo "Moving Pro-Scrub files..."
mv "$TMP_DIR"/* "$V_DIR/"
rmdir "$TMP_DIR"

echo "Optimization complete! Pro-Scrub assets are now live."
