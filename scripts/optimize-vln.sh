#!/bin/bash

# PRO-SCRUB OPTIMIZATION SCRIPT v3
# Encodes videos for butter-smooth scrubbing using H.264 (AVC).
# Generates dual-tier versions: 1080p (Desktop) and 720p (Mobile).

export PATH=$PATH:/usr/local/bin

H_DIR="public/videos"
V_DIR_LN="public/videos/virtual-tour/vorla-laxmi-narsamma"
V_DIR_LR="public/videos/virtual-tour/vorla-lakshma-reddy"

# Optimization Settings
# H.264 is used for superior scrubbing performance on mobile devices.
DESKTOP_OPTS="-vcodec libx264 -crf 24 -g 15 -vf scale=-2:1080 -preset medium -pix_fmt yuv420p -an -movflags +faststart -tune fastdecode"
MOBILE_OPTS="-vcodec libx264 -crf 28 -g 30 -vf scale=-2:720 -preset medium -pix_fmt yuv420p -an -movflags +faststart -tune fastdecode"

optimize_file() {
    local src_dir="$1"
    local src_file="$2"
    local dest_file="$3"
    local tmp_dir="$src_dir/tmp_pro_optimized"
    
    mkdir -p "$tmp_dir"
    
    if [ -f "$src_dir/$src_file" ]; then
        echo "------------------------------------------------"
        echo "Processing: $src_file"
        
        # 1. Desktop Version (1080p)
        echo " > Desktop (1080p)..."
        ffmpeg -hide_banner -loglevel error -y -i "$src_dir/$src_file" $DESKTOP_OPTS "$tmp_dir/$dest_file"
        
        # 2. Mobile Version (720p)
        echo " > Mobile (720p)..."
        local mobile_dest="${dest_file%.mp4}-mobile.mp4"
        ffmpeg -hide_banner -loglevel error -y -i "$src_dir/$src_file" $MOBILE_OPTS "$tmp_dir/$mobile_dest"
        
        # 3. Poster Image
        echo " > Poster..."
        ffmpeg -hide_banner -loglevel error -y -i "$src_dir/$src_file" -frames:v 1 -q:v 2 "$tmp_dir/${dest_file%.mp4}-poster.jpg"
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
echo "Optimizing Laxmi Narsamma Tour..."
optimize_file "$V_DIR_LN" "1-exterior.mp4" "1-exterior.mp4"
optimize_file "$V_DIR_LN" "2-parking.mp4" "2-parking.mp4"
optimize_file "$V_DIR_LN" "3-lobby.mp4" "3-lobby.mp4"
optimize_file "$V_DIR_LN" "4-interior-bare.mp4" "4-interior-bare.mp4"
optimize_file "$V_DIR_LN" "5-interior-decorated.mp4" "5-interior-decorated.mp4"
optimize_file "$V_DIR_LN" "6-courtyard-lobby.mp4" "6-courtyard-lobby.mp4"
optimize_file "$V_DIR_LN" "7-changing-rooms.mp4" "7-changing-rooms.mp4"
optimize_file "$V_DIR_LN" "8-bridal-room.mp4" "8-bridal-room.mp4"
optimize_file "$V_DIR_LN" "9-dining.mp4" "9-dining.mp4"
optimize_file "$V_DIR_LN" "10-courtyard.mp4" "10-courtyard.mp4"
optimize_file "$V_DIR_LN" "11-sanitation.mp4" "11-sanitation.mp4"
optimize_file "$V_DIR_LN" "12-banquet.mp4" "12-banquet.mp4"


# --- LAKSHMA REDDY ---
echo "Optimizing Lakshma Reddy Tour..."
optimize_file "$V_DIR_LR" "bighall-outside.mp4" "bighall-outside.mp4"
optimize_file "$V_DIR_LR" "big-parking.mp4" "big-parking.mp4"
optimize_file "$V_DIR_LR" "bighall-lobby.mp4" "bighall-lobby.mp4"
optimize_file "$V_DIR_LR" "bighall.mp4" "bighall.mp4"
optimize_file "$V_DIR_LR" "bighall-seating.mp4" "bighall-seating.mp4"

# --- HERO ---
echo "Optimizing Hero..."
# Hero remains 1080p, but we'll re-encode it for better consistency
optimize_file "$H_DIR" "vorla-hero-home-1080p.mp4" "vorla-hero-home-1080p.mp4"

# --- CLEANUP ---
cleanup "$V_DIR_LN"
cleanup "$V_DIR_LR"
cleanup "$H_DIR"

echo "Batch optimization complete! Multi-tier tour is live."

