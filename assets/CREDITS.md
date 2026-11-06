# Image credits

All images on the site are served from this repository. Each file exists as an
optimized AVIF plus a JPEG fallback, so visitors never contact a third-party
image host.

Cover art, posters, and screenshots remain the property of their respective
owners. They are reproduced here at reduced resolution to identify the work or
product. This repository's Apache License does not apply to them.

## Social sharing card

`assets/social/og.png` is original artwork created for this site; no third-party
attribution applies. It is used only as the Open Graph and Twitter preview
image, so it ships as a single 1200×630 PNG rather than the AVIF plus JPEG pair
used for in-page imagery.

The card is generated from `assets/social/og.html`, which uses the site's own
palette and 32px grid and loads Manrope and DM Mono from Google Fonts; the fonts
are not embedded. Regenerate it with headless Firefox:

```sh
P="$DELTA_SCRATCH_DIR/ffprof"
mkdir -p "$P"
printf '%s\n' 'user_pref("browser.shell.checkDefaultBrowser", false);' \
  'user_pref("browser.startup.page", 0);' > "$P/prefs.js"
"/Applications/Firefox.app/Contents/MacOS/firefox" -profile "$P" --headless \
  --screenshot "$PWD/assets/social/og.png" --window-size=1200,630 \
  "file://$PWD/assets/social/og.html"
```

## Project screenshots

| File | Source | Credit |
|---|---|---|
| `assets/projects/variantx-dialog.*` | [VariantX repository](https://github.com/AxonDragonScale/VariantX/blob/main/screenshots/variantx-flavor-and-build-type.png) | Ronak Harkhani |
| `assets/projects/insomnia-home-inactive.*` | [Insomnia repository](https://github.com/AxonDragonScale/Insomnia/blob/main/Docs/home-inactive.png) | Ronak Harkhani |
| `assets/projects/insomnia-home-active.*` | [Insomnia repository](https://github.com/AxonDragonScale/Insomnia/blob/main/Docs/home-active.png) | Ronak Harkhani |
| `assets/projects/insomnia-settings.*` | [Insomnia repository](https://github.com/AxonDragonScale/Insomnia/blob/main/Docs/settings.png) | Ronak Harkhani |

## Activity photos

| File | Source | License |
|---|---|---|
| `assets/activity/gym.*` | [Unsplash photo 1556817411-51d71c36cd87](https://images.unsplash.com/photo-1556817411-51d71c36cd87) | [Unsplash License](https://unsplash.com/license) |
| `assets/activity/badminton.*` | [Unsplash photo 1708312604109-16c0be9326cd](https://images.unsplash.com/photo-1708312604109-16c0be9326cd) | [Unsplash License](https://unsplash.com/license) |

## Book covers

Cover art is the property of the respective publishers and artists. The Open
Library entries below are used to identify each book.

| File | Source |
|---|---|
| `assets/covers/book-licanius.*` | [Open Library cover 8471205](https://covers.openlibrary.org/b/id/8471205-L.jpg) |
| `assets/covers/book-percy-jackson.*` | [Open Library cover 7239831](https://covers.openlibrary.org/b/id/7239831-L.jpg) |
| `assets/covers/book-mistborn.*` | [Open Library cover 11329782](https://covers.openlibrary.org/b/id/11329782-L.jpg) |
| `assets/covers/book-sapiens.*` | [Open Library cover 8634250](https://covers.openlibrary.org/b/id/8634250-L.jpg) |

## Game covers

Cover art is the property of the respective developers and publishers.

| File | Source |
|---|---|
| `assets/covers/game-hades.*` | [Wikimedia: Hades cover art](https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg) |
| `assets/covers/game-god-of-war.*` | [Wikimedia: God of War cover](https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg) |
| `assets/covers/game-control.*` | [Wikimedia: Control cover art](https://upload.wikimedia.org/wikipedia/en/e/e5/Control_game_cover_art.jpg) |
| `assets/covers/game-uncharted.*` | [Wikimedia: Uncharted 4 box art](https://upload.wikimedia.org/wikipedia/en/1/1a/Uncharted_4_box_artwork.jpg) |
| `assets/covers/game-clair-obscur.*` | [Wikimedia: Clair Obscur cover](https://upload.wikimedia.org/wikipedia/en/5/5a/Clair_Obscur%2C_Expedition_33_Cover_1.webp) |
| `assets/covers/game-hi-fi-rush.*` | [Wikimedia: Hi-Fi Rush cover art](https://upload.wikimedia.org/wikipedia/en/f/fc/Hi-Fi_Rush_cover_art.jpg) |
| `assets/covers/game-ori.*` | [Wikimedia: Ori and the Blind Forest logo](https://upload.wikimedia.org/wikipedia/en/b/b2/Ori_and_the_Blind_Forest_Logo.jpg) |
| `assets/covers/game-resident-evil.*` | [Wikimedia: Resident Evil 4 remake cover](https://upload.wikimedia.org/wikipedia/en/d/df/Resident_Evil_4_remake_cover_art.jpg) |
| `assets/covers/game-tomb-raider.*` | [Wikimedia: Tomb Raider cover](https://upload.wikimedia.org/wikipedia/en/f/f1/TombRaider2013.jpg) |

## Film posters

Poster art is the property of the respective studios and distributors. The two
Wikimedia files are hosted there as non-free cover art; they are reproduced here
only as small identifying thumbnails.

| File | Source |
|---|---|
| `assets/covers/film-shawshank.*` | [Wikimedia: The Shawshank Redemption poster](https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg) |
| `assets/covers/film-walter-mitty.*` | [FirstShowing: The Secret Life of Walter Mitty poster](https://media2.firstshowing.net/firstshowing/img7/waltermitty-firstposter-full.jpg) |
| `assets/covers/film-wake-up-sid.*` | [Wikimedia: Wake Up Sid poster](https://upload.wikimedia.org/wikipedia/en/9/9f/Wake_up_Sid.jpg) |
