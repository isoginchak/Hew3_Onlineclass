const slideUp = (el, duration = 300) => {
    el.style.height = el.offsetHeight + "px";
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    setTimeout(() => {
      el.style.display = "none";
      el.style.removeProperty("height");
      el.style.removeProperty("padding-top");
      el.style.removeProperty("padding-bottom");
      el.style.removeProperty("margin-top");
      el.style.removeProperty("margin-bottom");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
      el.classList.remove("is-open");
    }, duration);
  };
  
  // 要素をスライドしながら表示する関数(jQueryのslideDownと同じ)
  const slideDown = (el, duration = 300) => {
    el.classList.add("is-open");
    el.style.removeProperty("display");
    let display = window.getComputedStyle(el).display;
    if (display === "none") {
      display = "block";
    }
    el.style.display = display;
    let height = el.offsetHeight;
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    setTimeout(() => {
      el.style.removeProperty("height");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  };
  
  // 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
  const slideToggle = (el, duration = 300) => {
    if (window.getComputedStyle(el).display === "none") {
      return slideDown(el, duration);
    } else {
      return slideUp(el, duration);
    }
  };
  
  /* =================================================== */
  // DOM操作
  /* =================================================== */
  
  // アコーディオンを全て取得
  const accordions = document.querySelectorAll(".js-accordion");
  // 取得したアコーディオンをArrayに変換(IE対策)
  const accordionsArr = Array.prototype.slice.call(accordions);
  
  accordionsArr.forEach((accordion) => {
    // Triggerを全て取得
    const accordionTriggers = accordion.querySelectorAll(".js-accordion-trigger");
    // TriggerをArrayに変換(IE対策)
    const accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);
  
    accordionTriggersArr.forEach((trigger) => {
      // Triggerにクリックイベントを付与
      trigger.addEventListener("click", () => {
        // '.is-active'クラスを付与or削除
        trigger.classList.toggle("is-active");
        // 開閉させる要素を取得
        const content = trigger.querySelector(".accordion__content");
        // 要素を展開or閉じる
        slideToggle(content);
      });
    });
  });


  