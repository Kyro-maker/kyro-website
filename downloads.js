/* =========================================================================
   KYRO — /data/downloads.js
   =========================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE THE DOWNLOADS PAGE.

   The Downloads page (downloads.html) reads this file and automatically
   builds one card per app below — title, version, category, description,
   icon, and both buttons. You never need to touch downloads.html,
   style.css, or any other file to add, remove, or update an app.

   ------------------------------------------------------------------
   HOW TO ADD A NEW APP
   ------------------------------------------------------------------
   1. Copy one of the blocks below (e.g. the "freefire" block).
   2. Give it a new, unique key (the part before the colon, e.g. "sky").
   3. Fill in the fields — see the field guide below.
   4. Save the file. That's it — no HTML editing required.

   ------------------------------------------------------------------
   FIELD GUIDE
   ------------------------------------------------------------------
   title        — The app's name, shown as the card heading.
   version      — Shown under the description (e.g. "OB54", "v2.1.0").
   category     — Controls which filter chip the card shows under.
                  Use "game" or "utility", or add a new category here
                  AND add a matching chip in downloads.html's
                  <div class="filter-chips"> if you introduce a new one.
   badge        — Optional small highlight badge on the thumbnail
                  (e.g. "Official", "Latest", "Popular"). Leave as ""
                  to show no badge.
   description  — One short sentence shown on the card.
   icon         — Path to the app's icon image (svg/png/jpg all work).
                  Icons live in /assets/icons/. If a path is broken or
                  missing, a generic placeholder icon is shown instead
                  automatically — the page will never break.

   ------------------------------------------------------------------
   WHERE TO CHANGE THE LINKS  ⭐ (most common edit)
   ------------------------------------------------------------------
   openLink     — The "Open Link" button. Point this at the MediaFire
                  FILE PAGE (the normal mediafire.com/file/... page).
   downloadLink — The "Download" button. Point this at the DIRECT
                  download URL (the download2xxx.mediafire.com/...
                  link MediaFire gives you once you have the file
                  page open). Replace the "#" placeholders below with
                  your real MediaFire links whenever they're ready —
                  everything else on the page updates automatically.
   ========================================================================= */

const downloads = {

  freefire: {
    title: "Free Fire",
    version: "OB54",
    category: "game",
    badge: "Official",
    description: "Official Free Fire installer, mirrored on MediaFire for quick access.",
    icon: "assets/icons/freefire.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "https://www.mediafire.com/file/4fdsw5mxun46p4d/FREE.FIRE.OB54.V7A.xapk/file",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "https://download2444.mediafire.com/id2zuhi4p6jg4ZYKLTmvag9pLSQsGVsJIormnjnoFR6cxda-EpOoEdGl2rD-cW6DEOC92kgd8JUos8no8u102b6dRRrh_fv872sBDK_pjkMzU5qP9MsqQ7FasaFDxrU3_RECzCdz0md7Hw8vhT_KlqcO6mO1ANmcq_E_W-6HlLg_xJs/4fdsw5mxun46p4d/FREE.FIRE.OB54.V7A.xapk"
  },

  placeholderOne: {
    title: "Best Emulator",
    version: "1.0.0",
    category: "utility",
    badge: "",
    description: "Reserved slot — swap in your own software's name, description, icon, and links.",
    icon: "assets/icons/tool-one.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "https://www.mediafire.com/file/zqkpydhgqtx0gfc/Best.Bluestacks.VEX.rar/file",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "https://www.mediafire.com/file/zqkpydhgqtx0gfc/Best.Bluestacks.VEX.rar/file"
  },

  placeholderTwo: {
    title: "External Panel",
    version: "1.0.0",
    category: "utility",
    badge: "",
    description: "Reserved slot — swap in your own software's name, description, icon, and links.",
    icon: "assets/icons/tool-two.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "#",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "#"
  },

  placeholderThree: {
    title: "Internal Panel",
    version: "1.0.0",
    category: "utility",
    badge: "",
    description: "Reserved slot — swap in your own software's name, description, icon, and links.",
    icon: "assets/icons/tool-three.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "#",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "#"
  },

  placeholderFour: {
    title: "Requirments For Panel",
    version: "1.0.0",
    category: "utility",
    badge: "",
    description: "Reserved slot — swap in your own software's name, description, icon, and links.",
    icon: "assets/icons/tool-four.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "https://www.mediafire.com/file/x8lo3is9624adkb/Requirments.rar/file",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "https://www.mediafire.com/file/x8lo3is9624adkb/Requirments.rar/file"
  },

  placeholderFive: {
    title: "dll Injector",
    version: "1.0.0",
    category: "utility",
    badge: "",
    description: "Reserved slot — swap in your own software's name, description, icon, and links.",
    icon: "assets/icons/tool-five.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "https://www.mediafire.com/file/sjpu6yp7vy9vat2/Veyreon.Injector.by.g4ej.zip/file",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "https://www.mediafire.com/file/sjpu6yp7vy9vat2/Veyreon.Injector.by.g4ej.zip/file"
  },

  placeholderSix: {
    title: "Placeholder Tool Six",
    version: "1.0.0",
    category: "utility",
    badge: "",
    description: "Reserved slot — swap in your own software's name, description, icon, and links.",
    icon: "assets/icons/tool-six.svg",

    // 🔗 Replace with the real MediaFire file page:
    openLink: "#",
    // 🔗 Replace with the real MediaFire direct download link:
    downloadLink: "#"
  }

  // Add more apps here...
  // myNewApp: {
  //   title: "My New App",
  //   version: "1.0.0",
  //   category: "utility",
  //   badge: "",
  //   description: "One short sentence about it.",
  //   icon: "assets/icons/my-new-app.svg",
  //   openLink: "#",
  //   downloadLink: "#"
  // },

};
