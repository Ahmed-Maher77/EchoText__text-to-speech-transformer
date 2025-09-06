// ========================= SELECT DOM Elements =========================
const textArea = document.getElementById("textArea");
const speakBtn = document.getElementById("speakBtn");
const copyrightYear = document.getElementById("copyright-year");
const loader = document.getElementById("loader");
const mainContent = document.getElementById("main-content");
const mainContainer = document.querySelector(".main-content-container");
const title = document.querySelector(".main-content-container h1");
const textarea = document.querySelector(".main-content-container textarea");
const button = document.querySelector(".main-content-container button");
const footer = document.querySelector(".main-content footer");

// ========================= Initialization =========================
document.addEventListener("DOMContentLoaded", function () {
	// SET Current Year In Copyright
	if (copyrightYear) {
		copyrightYear.textContent = new Date().getFullYear();
	}
});

// ========================= Loader & Animations =========================
window.addEventListener("load", function () {
	// Hide loader after 2.5s
	setTimeout(() => {
		loader.style.animation = "loaderFadeOut 0.8s ease-in-out forwards";

		// Show main content with staggered animations
		setTimeout(() => {
			window.scrollTo(0, 0);
			mainContent.classList.remove("hidden");
			loader.style.display = "none";

			// Staggered element animations
			setTimeout(
				() =>
					(mainContainer.style.animation =
						"contentSlideIn 1s ease-out both"),
				100
			);
			setTimeout(
				() =>
					(title.style.animation = "titleSlideIn 1.2s ease-out both"),
				400
			);
			setTimeout(
				() =>
					(textarea.style.animation =
						"textareaSlideIn 1s ease-out both"),
				800
			);
			setTimeout(
				() =>
					(button.style.animation = "buttonSlideIn 1s ease-out both"),
				1200
			);
			setTimeout(
				() =>
					(footer.style.animation = "footerSlideIn 1s ease-out both"),
				1600
			);
		}, 400);
	}, 2500);
});

// ========================= Text-to-Speech Functionality =========================
// Handle Speak Button Click
speakBtn.addEventListener("click", function () {
	const textInput = textArea.value.trim();
	if (textInput !== "") {
		speak(textInput);
	}
});

// Speak the text
function speak(text) {
	if ("speechSynthesis" in window) {
		const speech = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(speech);
	} else {
		showModernPopup(
			"Speech Synthesis Not Supported",
			"Your browser doesn't support the Speech Synthesis API. Please try using a modern browser like Chrome, Firefox, Safari, or Edge.",
			"error"
		);
	}
}

// ========================= Popup System =========================
// Show Modern Popup
function showModernPopup(title, message, type = "info") {
	const overlay = document.createElement("div");
	overlay.className = "popup-overlay";
	overlay.innerHTML = `
		<div class="popup-container">
			<div class="popup-header">
				<div class="popup-icon ${type}">
					<i class="fa-solid ${
						type === "error"
							? "fa-exclamation-triangle"
							: "fa-info-circle"
					}"></i>
				</div>
				<h3 class="popup-title">${title}</h3>
			</div>
			<div class="popup-body">
				<p class="popup-message">${message}</p>
			</div>
			<div class="popup-footer">
				<button class="popup-btn popup-close">Got it</button>
			</div>
		</div>
	`;

	document.body.appendChild(overlay);

	// Close functionality
	const closeBtn = overlay.querySelector(".popup-close");
	const closePopup = () => {
		overlay.style.animation = "popupFadeOut 0.3s ease-in forwards";
		setTimeout(() => {
			if (document.body.contains(overlay)) {
				document.body.removeChild(overlay);
			}
		}, 300);
	};

	closeBtn.addEventListener("click", closePopup);
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) closePopup();
	});

	// Add fadeOut animation
	const fadeOutStyle = document.createElement("style");
	fadeOutStyle.textContent = `
		@keyframes popupFadeOut {
			from { opacity: 1; backdrop-filter: blur(8px); }
			to { opacity: 0; backdrop-filter: blur(0px); }
		}
	`;
	document.head.appendChild(fadeOutStyle);
}
