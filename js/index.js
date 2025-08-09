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

    const priceText = document.getElementById('price-text')
    const surpriceText = document.getElementById('surprice-text')


    // Счетчик прокруток колеса
    let spinCount = 0;
    const maxSpins = 2;

    wheelBtn.addEventListener('click', () => {
        wheelBtn.disabled = true;
        spinCount++;
        
        if (spinCount === 1) {
            // Первая прокрутка - 860 градусов
            wheelSpinner.classList.add('wheel__spinner_first_spin');
            
            priceText.innerHTML = `+0FS`
            surpriceText.innerHTML = `RÉESSAIE`
            popupBtn.innerHTML = `<span class="en">TOURNE ENCORE</span>`

            setTimeout(function () {
                localStorage.firstSpin = '6009_first_spin';
                wheelBtn.disabled = false;
                wheelBtn.querySelector('.en').textContent = 'TOURNER ENCORE'
            
                popup.classList.add('popup__show');
                popupWindow1.classList.add('popup__window_show');
            }, 4000);

            popupBtn.onclick = () => {
                popup.classList.remove('popup__show');
                popupWindow1.classList.remove('popup__window_show');
            }

        } else if (spinCount === 2) {
            // Вторая прокрутка - использует CSS keyframe
            // Сбрасываем позицию колеса для корректной работы CSS анимации
            wheelSpinner.style.transform = 'rotate(-40deg)';
            wheelSpinner.classList.remove('wheel__spinner_first_spin');
            wheelSpinner.classList.remove('wheel__spinner_animated');
            
            surpriceText.innerHTML = `Tu as presque gagné... fais ton dépôt maintenant pour débloquer ton cadeau!`
            priceText.innerHTML = `+300 FS`
            popupBtn.innerHTML = `<span class="en">UTILISER LE PRIX</span>`
            
                         popupBtn.onclick = () => {
                 window.location.replace(buildRedirectUrl())
             }
            // Небольшая задержка для применения сброса позиции
            setTimeout(() => {
                wheelSpinner.classList.add('wheel__spinner_win');
            }, 5);
            
            setTimeout(function () {
                localStorage.spin = '6009_spin';
                popup.classList.add('popup__show');
                popupWindow1.classList.add('popup__window_show');
                bonusesPage.classList.remove('bonuses__hidden');
            }, 4000);
        }
    })


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




    // Восстановление состояния двух прокруток
    if (localStorage.firstSpin == '6009_first_spin') {
        spinCount = 1;
        wheelSpinner.classList.add('wheel__spinner_first_spin');
        wheelBtn.textContent = 'TOURNER ENCORE';
    }
    
    // Если уже была вторая прокрутка
    if (localStorage.spin == '6009_spin') {
        spinCount = 2;
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

