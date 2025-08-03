window.addEventListener('load', () => {


    const wheelBtn = document.getElementById('wheel__button');
    const wheelSpinner = document.getElementById('wheel__spinner');
    const popup = document.getElementById('popup');
    const popupWindow1 = document.getElementById('popup__window_1');
    const popupWindow2 = document.getElementById('popup__window_2');
    const popupBtn = document.getElementById('popup__button');
    const gameWheel = document.getElementById('game__wheel');
    const gameCards = document.getElementById('game__cards');
    const cards = document.getElementsByClassName('card');
    const bonusesPage = document.getElementById('bonuses-page');
    const bonusFinal = document.getElementById('bonus-2');
    const imgPath = wheelSpinner.getAttribute('data-path');


    wheelBtn.addEventListener('click', () => {
        wheelBtn.disabled = true;
        wheelSpinner.classList.remove('wheel__spinner_animated');
        wheelSpinner.classList.add('wheel__spinner_win');
        setTimeout(function () {
            localStorage.spin = '6009_spin';
            popup.classList.add('popup__show');
            popupWindow1.classList.add('popup__window_show');
            bonusesPage.classList.remove('bonuses__hidden');

        }, 4000);
    })

    // popupBtn.addEventListener('click', () => {
    //     popup.classList.remove('popup__show');
    //     popupWindow1.classList.remove('popup__window_show');
    //     gameWheel.classList.add('game__hidden');
    //     gameCards.classList.remove('game__hidden');
    //     localStorage.gameCards = '6009_game2_start'
    // })

    let counter = 0;

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            if (counter == 0) {
                cards[i].classList.add('card__animation');
                cards[i].getElementsByClassName('card__action')[0].src = imgPath + '/card-animation.gif' + '?a=' + counter;
                localStorage.cards_win1_6009 = cards[i].getAttribute('data-attr');
                localStorage.gameCards = '6009_game2_card1';
                counter++;
                for (let j = 0; j < cards.length; j++) {
                    if (j !== i) {
                        cards[j].classList.add('card__disabled');
                        setTimeout(function () {
                            cards[j].classList.remove('card__disabled');
                        }, 1100);
                    }
                }
            } else if (counter == 1) {
                cards[i].classList.add('card__animation');
                cards[i].getElementsByClassName('card__action')[0].src = imgPath + '/card-animation.gif' + '?a=' + counter;
                localStorage.cards_win2_6009 = cards[i].getAttribute('data-attr');
                localStorage.gameCards = '6009_game2_card2'
                for (let j = 0; j < cards.length; j++) {
                    if (j !== i) {
                        cards[j].classList.add('card__disabled');
                    }
                }
                setTimeout(function () {
                    localStorage.currentSpin = 'HTMLC_1174_mbs_spin';
                    popup.classList.add('popup__show');
                    popupWindow2.classList.add('popup__window_show');
                    bonusFinal.classList.remove('bonus__hidden')

                }, 2000);
            }
        })
    }



    var $html = $('html'), $preloader = $('.preloader'), $currLang = $('.curr_lang'),
        lang = localStorage.lang,
        langParam = (new URLSearchParams(window.location.search)).get('lang'),
        langList = ['en', 'de', 'pl'];


    var langListData = 0;
    var i;

    for (i = 0; i < langList.length; i++) {
        if (lang === langList[i] || langParam === langList[i]) {
            for (j = 0; j < langList.length; j++) {
                $html.removeClass(langList[j]);
            }
            $html.addClass(langList[i]);
            lang = langList[i];
        }
    }

    for (i = 0; i < langList.length; i++) {
        if (lang === langList[i]) {
            langListData = 1;
        }
    }

    if (langListData === 0) {
        $html.addClass('en');
        lang = 'en';
    }


    langList.forEach(function (element) {
        $html.removeClass(element).addClass(lang);
    });

    $('.lang_list_item[data-lang="' + lang + '"]')
        .addClass('curr')
        .siblings()
        .removeClass('curr');
    $currLang.html($('.lang_list_item[data-lang="' + lang + '"]').html());

    setTimeout(function () {
        $preloader.fadeOut();
        setTimeout(function () {
            $html.addClass('hide');
        }, 200);
    }, 200);


    var $langSwitcher = $('.lang_switcher'), $langList = $('.lang_list'), $langListItem = $('.lang_list_item');


    $langSwitcher.click(function () {
        $langList.toggleClass('act');
    });


    // wheelSpinner.src = imgPath + "/wheel-" + lang + ".png";

    $langListItem.click(function () {
        $preloader.fadeIn();
        $html.removeClass('hide');
        setTimeout(function () {
            $preloader.fadeOut();
            $html.addClass('hide');
        }, 200);
        var lang = $(this).data('lang');
        var langs = $('.lang_list_item').map(function (i, el) {
            return $(el).data('lang');
        }).toArray().join(" ");
        $html.removeClass(langs).addClass(lang);
        localStorage.lang = lang;
        $('.lang_list_item[data-lang="' + lang + '"]')
            .addClass('curr')
            .siblings()
            .removeClass('curr');
        $currLang.html($(this).html());
        // wheelSpinner.src = imgPath + "/wheel-" + lang + ".png";
    });

    $(document).mouseup(function (e) {
        if (!$langSwitcher.is(e.target) && $langSwitcher.has(e.target).length === 0) {
            $langList.removeClass('act');
        }

    });


    if (localStorage.spin == '6009_spin') {
        wheelBtn.disabled = true;
        wheelSpinner.classList.remove('wheel__spinner_animated');
        wheelSpinner.classList.add('wheel__spinner_final');
        popup.classList.add('popup__show');
        popupWindow1.classList.add('popup__window_show');
        bonusesPage.classList.remove('bonuses__hidden');
    }

    if (localStorage.gameCards) {
        switch (localStorage.gameCards) {
            case '6009_game2_start': {
                popup.classList.add('popup__show');
                popupWindow1.classList.add('popup__window_show');
                gameWheel.classList.add('game__hidden');
                gameCards.classList.remove('game__hidden');
                break;
            }
            case '6009_game2_card1': {
                popup.classList.remove('popup__show');
                popupWindow1.classList.remove('popup__window_show');
                gameWheel.classList.add('game__hidden');
                gameCards.classList.remove('game__hidden');
                break;
            }
            case '6009_game2_card2': {
                popup.classList.remove('popup__show');
                popupWindow1.classList.remove('popup__window_show');
                gameWheel.classList.add('game__hidden');
                gameCards.classList.remove('game__hidden');
                popup.classList.add('popup__show');
                popupWindow2.classList.add('popup__window_show');
                bonusFinal.classList.remove('bonus__hidden')
                break;
            }
        }

        for (let i = 0; i < cards.length; i++) {
            if (localStorage.cards_win1_6009 == cards[i].getAttribute('data-attr')) {
                cards[i].classList.add('card__win');
                counter = 1;
            }
            if (localStorage.cards_win2_6009 == cards[i].getAttribute('data-attr')) {
                cards[i].classList.add('card__win');
                counter = 2;
                for (let j = 0; j < cards.length; j++) {
                    cards[j].classList.add('card__disabled');
                }
            }
        }
    }


});

