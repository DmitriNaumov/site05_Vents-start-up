$(function () {

    'use strict';



    // Cache selectors
    let lastId,
        topMenu = $(".nav__wrapp"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            let item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        let href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        let fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        let cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });


    //popup
    $('.header__button').click(function () {
        $('.popup__form').fadeIn();
        $('body').css('overflow', 'hidden');
    });

    $('.popup-close, .popup__thx-btn').click(function () {
        $('.popup__form, .popup__thx').fadeOut();
        $('body').css('overflow', 'visible');
    });

    $(document).mouseup(function (e) {
        let container = $(".popup__form, .popup__thx");
        if (container.has(e.target).length === 0) {
            container.fadeOut();
            $('body').css('overflow', 'visible');
        }
    });


    //lang select
    $('.lang__select').click(function () {
        $('.lang').toggleClass('active');
        $('.lang__wrapp').fadeToggle();
        $(this).css({ 'pointer-events': 'none' });
        setTimeout(function () {
            $(this).css({ 'pointer-events': 'auto' });
        }.bind(this), 300);
    });
    $('.lang__item').click(function () {
        let dataLang = $(this).attr('data-lang');
        $('.lang__select').html(dataLang).removeClass('active');
        $('.lang').removeClass('active');
        $('.lang__wrapp').fadeOut();
    });

    $(document).click(function (e) {
        if ($(e.target).closest('.lang').length) {
            return;
        }
        $('.lang').removeClass('active');
        $('.lang__wrapp').fadeOut();
    });


    //scroll dovn
    $('.header__scroll-btn').click(function (e) {
        e.preventDefault();
        let scroll = $('.theme').offset().top;
        $('html, body').animate({ scrollTop: scroll }, 350);
    });


    //load header img
    $(document).ready(function () {
        $('.hend, .hend-water, .svg-arrow, .point-white, .svg-flower').addClass('active');
    });


    //settings ackordion
    $('.theme__item').on('click', function () {
        let timeAnim = 250;
        $(this).find('.theme__item-head').toggleClass('active').next().fadeToggle(timeAnim);
        $(this).css({ 'pointer-events': 'none' });
        setTimeout(function () {
            $(this).css({ 'pointer-events': 'auto' });
        }.bind(this), timeAnim);
    });


    //anim scroll
    $(window).scroll(function () {
        let scrollDock = $(document).scrollTop();

        // rotate border
        let scrollWork = $('.theme').offset().top;
        if (scrollDock + 500 >= scrollWork) {
            $('.theme__border').addClass('active');
        } else {
            $('.theme__border').removeClass('active');
        }

        //anim condition arrow
        let scrollCondition = $('.condition__bg').offset().top;
        if (scrollDock + 500 >= scrollCondition) {
            $('.svg-arr').addClass('active');
        }

        //animate howwork
        let scrollHowwork = $('.howwork__wrapp').offset().top;
        if (scrollDock + 500 >= scrollHowwork) {
            $('.howwork__item').addClass('active');
        } else {
            $('.howwork__item').removeClass('active');
        }

    });


    // validation check
    $("#form-f").validate({
        rules: {
            name: {
                required: true
            },
            tel: {
                required: true
            },
            mail: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Ошибка. Заполниете это поле"
            },
            tel: {
                required: "Ошибка. Заполниете это поле"
            },
            mail: {
                required: "Ошибка. Заполниете это поле",
                email: "Введите действительный адрес электронной почты",
            }
        },
        submitHandler: function () {
            $('.popup__thx').fadeIn();
            $("form#form-f").trigger('reset');
            $(".form__select-country-f").html('Страна');
            $(".form__select-input-f").attr('value', '');
            $('body').css('overflow', 'hidden');
        }
    });

    $("#form-p").validate({
        rules: {
            name: {
                required: true
            },
            tel: {
                required: true
            },
            mail: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Ошибка. Заполниете это поле"
            },
            tel: {
                required: "Ошибка. Заполниете это поле"
            },
            mail: {
                required: "Ошибка. Заполниете это поле",
                email: "Введите действительный адрес электронной почты",
            }
        },
        submitHandler: function () {
            $('.popup__thx').fadeIn();
            $('.popup__form').fadeOut();
            $("form#form-p").trigger('reset');
            $(".form__select-country-p").html('Страна');
            $(".form__select-input-p").attr('value', '');
            // $('body').css('overflow', 'hidden');
        }
    });


    //form tel mask
    $(".phone_mask").mask("+7(999)999-99-99");


    //custom form select
    $('.form__select-country').click(function () {
        $(this).toggleClass('active');
        $(this).next('.form__option').fadeToggle();
        $(this).css({ 'pointer-events': 'none' });
        setTimeout(function () {
            $(this).css({ 'pointer-events': 'auto' });
        }.bind(this), 300);
    });

    $('.form__list-f').click(function () {
        let dataCountryF = $(this).attr('data-country');
        $('.form__select-country-f').html(dataCountryF).removeClass('active');
        $('.form__select-input-f').attr('value', dataCountryF);
        $('.form__option').fadeOut();
    });

    $('.form__list-p').click(function () {
        let dataCountryP = $(this).attr('data-country');
        $('.form__select-country-p').html(dataCountryP).removeClass('active');
        $('.form__select-input-p').attr('value', dataCountryP);
        $('.form__option').fadeOut();
    });


    //slider
    if ($(window).width() > 710) {
        $('.requirement__slider').slick('unslick');
    } else {
        $('.requirement__slider').slick({
            dots: true,
            adaptiveHeight: true
        });
    }

});