#!/bin/bash

# PRO-SCRUB OPTIMIZATION SCRIPT v2
# Encodes videos for butter-smooth scrubbing using H.265 and optimized GOP.

H_DIR="public/videos"
V_DIR_LN="public/videos/virtual-tour/vorla-laxmi-narsamma"
V_DIR_LR="public/videos/virtual-tour/vorla-lakshma-reddy"

# H.265 (HEVC) Settings
OPTS="-vcodec libx265 -crf 21 -g 10 -preset medium -pix_fmt yuv420p -an -movflags +faststart -tune fastdecode"

optimize_file() {
    local src_dir="$1"
    local src_file="$2"
    local dest_file="$3"
    local tmp_dir="$src_dir/tmp_pro_optimized"
    
    mkdir -p "$tmp_dir"
    
    if [ -f "$src_dir/$src_file" ]; then
        echo "Optimizing: $src_file in $src_dir..."
        ffmpeg -y -i "$src_dir/$src_file" $OPTS "$tmp_dir/$dest_file"
        ffmpeg -y -i "$src_dir/$src_file" -frames:v 1 -q:v 2 "$tmp_dir/${dest_file%.mp4}-poster.jpg"
    else
        echo "Skip: $src_file not found in $src_dir"
    fi
}

cleanup() {
    local dir="$1"
    if [ -d "$dir/tmp_pro_optimized" ]; then
        echo "Finalizing $dir..."
        mv "$dir/tmp_pro_optimized"/* "$dir/"
        rmdir "$dir/tmp_pro_optimized"
    fi
}

# --- LAXMI NARSAMMA ---
optimize_file "$V_DIR_LN" "1-exterior.mp4" "1-exterior.mp4"
optimize_file "$V_DIR_LN" "walk-in.mp4" "2-parking.mp4"
optimize_file "$V_DIR_LN" "entrance-lobby.mp4" "3-lobby.mp4"
optimize_file "$V_DIR_LN" "main hall.mp4" "4-interior-bare.mp4"
optimize_file "$V_DIR_LN" "decorated-vln.mp4" "5-interior-decorated.mp4"
optimize_file "$V_DIR_LN" "courtyard-lobby.mp4" "6-courtyard-lobby.mp4"
optimize_file "$V_DIR_LN" "makeup.mp4" "7-changing-rooms.mp4"
optimize_file "$V_DIR_LN" "bridal room.mp4" "8-bridal-room.mp4"
optimize_file "$V_DIR_LN" "catering.mp4" "9-dining.mp4"
optimize_file "$V_DIR_LN" "courtyard.mp4" "10-courtyard.mp4"
optimize_file "$V_DIR_LN" "sanitation.mp4" "11-sanitation.mp4"
optimize_file "$V_DIR_LN" "banquet.mp4" "12-banquet.mp4"

# --- LAKSHMA REDDY ---
echo "Optimizing Lakshma Reddy Tour..."
optimize_file "$V_DIR_LR" "bighall-outside.mp4" "bighall-outside.mp4"
optimize_file "$V_DIR_LR" "big-parking.mp4" "big-parking.mp4"
optimize_file "$V_DIR_LR" "bighall-lobby.mp4" "bighall-lobby.mp4"
optimize_file "$V_DIR_LR" "bighall.mp4" "bighall.mp4"
optimize_file "$V_DIR_LR" "bighall-seating.mp4" "bighall-seating.mp4"

# --- HERO ---
echo "Optimizing Hero..."
optimize_file "$H_DIR" "vorla-hero-home-1080p.mp4" "vorla-hero-home-1080p.mp4"

# --- CLEANUP ---
cleanup "$V_DIR_LN"
cleanup "$V_DIR_LR"
cleanup "$H_DIR"

echo "Batch optimization complete! All scrubbing is now Pro-Grade."
