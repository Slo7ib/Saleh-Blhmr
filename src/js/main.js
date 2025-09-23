document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-tab]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab"); // e.g. tab3
      const lang = tab.id.includes("ar") ? "ar" : "en"; // detect language
      const targetContent = document.querySelector(
        `#tab-content-${lang}-${target.replace("tab", "")}`,
      );

      // Remove active styles from all tabs in this language
      document.querySelectorAll(`[id^="tab-btn-${lang}-"]`).forEach((t) => {
        t.classList.remove("bg-secondary", "text-black");
        t.classList.add("bg-primary", "text-white");
      });

      // Hide all contents of this language
      document.querySelectorAll(`[id^="tab-content-${lang}-"]`).forEach((c) => {
        c.classList.add("hidden");
      });

      // Activate the clicked tab
      tab.classList.remove("bg-primary", "text-white");
      tab.classList.add("bg-secondary", "text-black");

      // Show its content
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });
});

// before
//
const skills = document.querySelectorAll(".skill");
const skillsPerPage = 3;
let currentIndex = 0;
const totalPages = Math.ceil(skills.length / skillsPerPage);

function showSkills() {
  skills.forEach((skill, i) => {
    skill.style.display =
      i >= currentIndex * skillsPerPage &&
      i < (currentIndex + 1) * skillsPerPage
        ? "flex"
        : "none";
  });
}

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalPages) % totalPages;
  showSkills();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalPages;
  showSkills();
});

showSkills();
// Blog Section
window.showBloggerPosts = function (data) {
  const posts = (data.feed.entry || []).reverse(); // newest first
  let currentIndex = 0;
  const postsPerPage = 3;

  function renderPosts() {
    let html = "";
    const visiblePosts = posts.slice(currentIndex, currentIndex + postsPerPage);

    visiblePosts.forEach((post) => {
      const title = post.title.$t;
      const link = post.link.find((l) => l.rel === "alternate").href;
      const content = post.content?.$t || "";

      // Image
      let imageUrl = post.media$thumbnail?.url;
      if (imageUrl) {
        imageUrl = imageUrl.replace(/s\d{2,4}(-c)?/, "s1600");
      } else {
        const imgMatch = content.match(/<img.*?src=\"(.*?)\"/);
        if (imgMatch) imageUrl = imgMatch[1];
      }

      const author = post.author?.[0]?.name?.$t || "Unknown Author";
      const publishedDate = new Date(post.published.$t).toDateString();

      html += `<a href="${link}" target="_blank">
        <article
  class="shadow-lg flex flex-col h-[500px] w-1/4 rounded-3xl border border-white/20 bg-white/10 p-3 font-sans backdrop-blur-md backdrop-filter text-right"
>
  <!-- image -->
  <img class="rounded-2xl w-full h-56" src="${imageUrl}" alt="${title}" />

  <!-- title -->
  <h1
    class="my-6 font-serif text-2xl font-extrabold tracking-wide text-white capitalize"
  >
    <a href="${link}" target="_blank">${title}</a>
  </h1>

  <!-- excerpt -->
  <p class="line-clamp-3 text-sm text-ellipsis text-white">
    ${content.replace(/<[^>]+>/g, "").substring(0, 150)}...
  </p>

  <!-- author section pinned at bottom -->
  <div class="flex flex-row-reverse items-center gap-x-3 mt-auto">
    <div
      class="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600"
    >
      <span class="font-medium text-gray-600 dark:text-gray-300">${author[0] || "?"}</span>
    </div>
    <div class="text-secondary">
      <h2 class="text-lg font-semibold">${author}</h2>
      <h4 class="text-xs">Posted on ${publishedDate}</h4>
    </div>
  </div>
</article>
</a>
      `;
    });

    document.getElementById("blog-posts").innerHTML = html;

    // Enable/disable arrows
    document.getElementById("blogPrevBtn").disabled = currentIndex <= 0;
    document.getElementById("blogNextBtn").disabled =
      currentIndex + postsPerPage >= posts.length;
  }

  // Button actions
  document.getElementById("blogPrevBtn").onclick = function () {
    if (currentIndex - postsPerPage >= 0) {
      currentIndex -= postsPerPage;
    } else {
      currentIndex = 0;
    }
    renderPosts();
  };

  document.getElementById("blogNextBtn").onclick = function () {
    if (currentIndex + postsPerPage < posts.length) {
      currentIndex += postsPerPage;
    } else {
      currentIndex = posts.length - postsPerPage;
      if (currentIndex < 0) currentIndex = 0;
    }
    renderPosts();
  };

  // Initial render
  renderPosts();
};

// Footer
const currentYear = new Date().getFullYear();

document.getElementById("current-year").textContent = currentYear;

// Language switcher
const ar = {
  "nav-home": "الرئيسية",
  "nav-about": "من أنا",
  "nav-skills": "المهارات",
  "nav-portfolio": "المشاريع",
  "nav-contact": "تواصل معي",
  "hero-title": "مرحبًا بكم في موقعي",
  "hero-subtitle": "أنا مطور ويب بدوام كامل",
  "about-title": "من أنا",
  "about-content":
    "أنا مطور ويب متحمس أعيش في [مدينتك، دولتك]. أتمتع بمهارات قوية في [مجالات خبرتك] ولدي شغف بإنشاء حلول ويب مبتكرة.",
  "skills-title": "المهارات",
  "portfolio-title": "المشاريع",
  "contact-title": "تواصل معي",
  "footer-copyright": "جميع الحقوق محفوظة © [اسمك]",
};

const en = {
  "nav-home": "Home",
  "nav-about": "About",
  "nav-skills": "Skills",
  "nav-portfolio": "Portfolio",
  "nav-contact": "Contact",
  "hero-title": "Welcome to My Website",
  "hero-subtitle": "I am a Full Stack Developer",
  "about-title": "About Me",
  "about-content":
    "I am an enthusiastic web developer based in [Your City, Your Country]. I have strong skills in [Your Expertise] and a passion for creating innovative web solutions.",
  "skills-title": "My Skills",
  "portfolio-title": "My Projects",
  "contact-title": "Get in Touch",
  "footer-copyright": "All rights reserved © [Your Name]",
};

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = lang[key] || key;
  });

  // Update HTML tag for directionality
  document.documentElement.setAttribute("lang", lang === ar ? "ar" : "en");
  document.documentElement.setAttribute("dir", lang === ar ? "rtl" : "ltr");
}

// Initial language set
setLanguage(en);

// Language switcher event
document.getElementById("language-selector").addEventListener("change", (e) => {
  const lang = e.target.value === "ar" ? ar : en;
  setLanguage(lang);
});

// Dynamic content translation (e.g., blog posts) - expand as needed
function translateContent(lang) {
  const posts = document.querySelectorAll("#blog-posts article");
  posts.forEach((post) => {
    const titleEl = post.querySelector("h1 a");
    const contentEl = post.querySelector("p");
    const authorEl = post.querySelector("h2");
    const dateEl = post.querySelector("h4");

    // Simple translation logic - expand with your translation data
    if (lang === ar) {
      titleEl.textContent = titleEl.getAttribute("data-ar-title");
      contentEl.textContent = contentEl.getAttribute("data-ar-content");
      authorEl.textContent = authorEl.getAttribute("data-ar-author");
      dateEl.textContent = dateEl.getAttribute("data-ar-date");
    } else {
      titleEl.textContent = titleEl.getAttribute("data-en-title");
      contentEl.textContent = contentEl.getAttribute("data-en-content");
      authorEl.textContent = authorEl.getAttribute("data-en-author");
      dateEl.textContent = dateEl.getAttribute("data-en-date");
    }
  });
}

// Call this function after rendering posts
renderPosts = ((origRender) => {
  return function () {
    origRender();
    const lang = document.getElementById("language-selector").value;
    translateContent(lang === "ar" ? ar : en);
  };
})(renderPosts);
