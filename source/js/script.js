"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const menuBtns = document.querySelectorAll(".menu__btn"),
    menuBlocks = document.querySelectorAll(".menu__mobile-block"),
    greyButtons = document.querySelectorAll(".grey-button"),
    greybuttonBlocks = document.querySelectorAll(".grey-button__block"),
    popup = document.querySelector(".popup"),
    popupClose = popup.querySelector(".popup__close"),
    popupOpenBtn = document.querySelector(".header__links");

  //Mobile
  function hiddenMenuBlocks() {
    menuBtns.forEach((btn) => {
      btn.querySelector(".menu__img").classList.remove("menu__img--active");
    });
    menuBlocks.forEach((block) => {
      block.classList.remove("show");
      block.classList.add("hidden");
    });
  }

  menuBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (menuBlocks[i].classList.contains("show")) {
        hiddenMenuBlocks();
      } else {
        hiddenMenuBlocks();
        menuBtns[i]
          .querySelector(".menu__img")
          .classList.add("menu__img--active");
        menuBlocks[i].classList.add("show");
        menuBlocks[i].classList.remove("hidden");
      }
    });
  });

  //grey-button blocks
  function hiddenBlocks() {
    greyButtons.forEach((btn) => {
      btn.classList.remove("grey-button--active");
    });
    greybuttonBlocks.forEach((block) => {
      block.classList.remove("show");
      block.classList.add("hidden");
    });
  }

  greyButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (greybuttonBlocks[i].classList.contains("show")) {
        hiddenBlocks();
      } else {
        hiddenBlocks();
        greyButtons[i].classList.add("grey-button--active");
        greybuttonBlocks[i].classList.add("show");
        greybuttonBlocks[i].classList.remove("hidden");
      }
    });
  });

  //popup
  function openPopup() {
    popup.classList.remove("hidden__opacity");
    popup.classList.add("show__opacity");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    popup.classList.remove("show__opacity");
    popup.classList.add("hidden__opacity");
    document.body.style.overflow = "";
  }

  popupOpenBtn.addEventListener("click", openPopup);
  popupClose.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  //toggler
  $(".toggler").click(function () {
    $(this).next().toggle("slow");
    $(this).closest("p.toggler").toggleClass("no-active");
  });

  //checkselect
  (function ($) {
    function setChecked(target) {
      var checked = $(target).find("input[type='checkbox']:checked").length;
      if (checked) {
        $(target)
          .find("select option:first")
          .html("Выбрано: " + checked);
      } else {
        $(target).find("select option:first").html("Факультеты");
      }
    }

    $.fn.checkselect = function () {
      this.wrapInner('<div class="checkselect-popup"></div>');
      this.prepend(
        '<div class="checkselect-control">' +
          '<select class="form-control"><option></option></select>' +
          '<div class="checkselect-over"></div>' +
          "</div>"
      );

      this.each(function () {
        setChecked(this);
      });
      this.find('input[type="checkbox"]').click(function () {
        setChecked($(this).parents(".checkselect"));
      });
    };
  })(jQuery);
  $(".checkselect").checkselect();

  //table
  const tbody = document.querySelector(".table tbody");
  let tableRows;
  let tableArr = [];

  function getRows() {
    tableRows = document.querySelectorAll(".table tbody tr");
  }

  function getMatrix() {
    getRows();
    tableRows.forEach((row) => {
      tableArr.push(row.querySelectorAll("td"));
    });
  }

  function setCellAtribut() {
    getMatrix();
    tableRows.forEach((row, i) => {
      tableArr[i].forEach((cell, j) => {
        cell.setAttribute("data-id-cell", j);
      });
    });
  }

  function checkCellNumbers(e) {
    setCellAtribut();
    tableRows.forEach((row, i) => {
      tableArr[i].forEach((cell) => {
        if (e.target == cell) {
          let x = +cell.getAttribute("data-id-cell");
          deleteColorCell();
          setColorCell(row, i, x);
        }
      });
    });
  }

  function deleteColorCell() {
    tableArr.forEach((row) => {
      row.forEach((cell) => {
        cell.classList.remove("table__row-fitu--active");
        cell.classList.remove("table__row-fksis--active");
        cell.classList.remove("table__row-fre--active");
        cell.classList.remove("table__row-ief--active");
        cell.classList.remove("table__row-fik--active");
        cell.classList.remove("table__row-iit--active");
        cell.classList.remove("table__row-vf--active");
        cell.classList.remove("table__row-fkp--active");
      });
    });
  }

  function setColorCell(row, rowID, cellID) {
    if (cellID != 0) {
      for (let i = rowID; i >= 0; i--) {
        tableArr[i][cellID].classList.add(`${row.className}--active`);
      }

      for (let i = cellID; i >= 0; i--) {
        tableArr[rowID][i].classList.add(`${row.className}--active`);
      }
    }
  }

  tbody.addEventListener("mouseover", checkCellNumbers);
});
