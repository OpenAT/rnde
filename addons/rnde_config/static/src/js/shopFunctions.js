
$(document).ready( function() {
    $("body[data-rootcatid='4'] .oe_product").click( function( e ) {
        e.preventDefault();
    });

    setupPriceDonate();
    setupRemoveZeroDecimals();
    setupAutoRecomputePriceSuggestions();
});

function setupPriceDonate() {
    $(document).ready(() => {
        removePriceDonateComma();
    });

    $('#price_donate').change(() => {
        removePriceDonateComma();
    });

    const priceDonate = document.getElementById("price_donate");

    if (priceDonate) {
        priceDonate.addEventListener('click', function(e) {
            priceDonateClearAllActive();
            document.getElementsByClassName('price_donate').item(0).classList.add("active");
        });

        priceDonate.addEventListener('change', function(e) {
        });
    }

    const price_suggestions = document.getElementsByClassName("price_donate_suggested");

    if (price_suggestions) {
        const urlParams = new URLSearchParams(window.location.search);
        let suggestionMatched = false;
        const suppliedPriceDonate = urlParams.get('price_donate');

        for (let i = 0; i < price_suggestions.length; i++) {
            price_suggestions.item(i).addEventListener("click", function(e) {
                priceDonateClearAllActive();
                e.currentTarget.parentElement.classList.add("active");
            });

            if (price_suggestions.item(i).value == suppliedPriceDonate) {
                suggestionMatched = true;
                price_suggestions.item(i).parentElement.classList.add("active");
            }
        }

        if (priceDonate && !suggestionMatched) {
             document.getElementsByClassName('price_donate').item(0).classList.add("active");
        }
    }
}

function setupAutoRecomputePriceSuggestions() {
    const header = document.getElementById('payment_intervals');

    if (!header || header.getAttribute('data-auto-recompute-price-donate') !== 'True')
        return;

    updatePriceSuggestion();

    const interval_select = document.getElementsByName('payment_interval_id');

    if (interval_select.length == 1) {
        interval_select.item(0).addEventListener("change", e => {
            updatePriceSuggestion();
        });
    } else {
        const elements = document.querySelectorAll('[data-payment-interval-length-in-months]');

        for (let i = 0; i < elements.length; i++) {
            elements.item(i).addEventListener("change", e => {
                updatePriceSuggestion();
            });
        }
    }
}

function removePriceDonateComma() {
    const priceDonate = document.getElementById("price_donate");

    if (priceDonate) {
        if (priceDonate.value.endsWith('.00') || priceDonate.value.endsWith(',00')) {
            priceDonate.value = priceDonate.value
                .substring(0, priceDonate.value.length - 3)
                .replace(',', '')
                .replace('.', '');
        }
        else if (priceDonate.value.endsWith('.0') || priceDonate.value.endsWith(',0')) {
            priceDonate.value = priceDonate.value
                .substring(0, priceDonate.value.length - 2)
                .replace(',', '')
                .replace('.', '');
        }
    }
}

function setupDynamicPriceTextSize() {
    // Only setup for multi step
    var body = document.getElementsByTagName("body").item(0);

    var isMultiStep = body.getAttribute("data-on-shop-page") == "True"
        && body.getAttribute("data-latest-product-theme") == "care_multistep"
        && body.getAttribute("data-confirmation-controller-called") != "True";

    if (!isMultiStep)
        return;

    addPriceDonateInputHandlers();
    adjustPriceSuggestions();
}

function addPriceDonateInputHandlers() {
    const priceDonate = document.getElementById("price_donate");

    if (priceDonate) {
        $('#price_donate').attr('maxlength','7');
        $('#price_donate').change(() => {
            updatePriceDonateTextSize();
        });
        $('#price_donate').keyup(() => {
            updatePriceDonateTextSize(priceDonate);
        });
    }
}

function priceDonateClearAllActive() {
    document.getElementsByClassName('price_donate').item(0).classList.remove("active");

    const suggestions = document.getElementsByClassName("price_donate_suggested");

    for (let j = 0; j < suggestions.length; j++) {
        suggestions.item(j).parentElement.classList.remove("active");
    }
}

function setupRemoveZeroDecimals() {
    const price_values = document.getElementsByClassName("oe_currency_value");

    for (let i = 0; i < price_values.length; i++) {
        if (price_values.item(i).innerText.endsWith('.00') || price_values.item(i).innerText.endsWith(',00')) {
            price_values.item(i).innerText = price_values.item(i).innerText
                .substring(0, price_values.item(i).innerText.length - 3)
                .replace(',', '')
                .replace('.', '');
        }
    }
}

function setupAutoRecomputePriceSuggestions() {
    const header = document.getElementById('payment_intervals');

    if (!header || header.getAttribute('data-auto-recompute-price-donate') !== 'True')
        return;

    updatePriceSuggestion();

    const interval_select = document.getElementsByName('payment_interval_id');

    if (interval_select.length == 1) {
        interval_select.item(0).addEventListener("change", e => {
            updatePriceSuggestion();
        });
    } else {
        const elements = document.querySelectorAll('[data-payment-interval-length-in-months]');

        for (let i = 0; i < elements.length; i++) {
            elements.item(i).addEventListener("change", e => {
                updatePriceSuggestion();
            });
        }
    }
}

function updatePriceSuggestion() {
    var interval = 1;
    let selectedInterval = document.querySelectorAll('[data-payment-interval-length-in-months]:checked');

    if (!selectedInterval) {
        selectedInterval = document.querySelectorAll('[data-payment-interval-length-in-months]:selected');
    }

    if (selectedInterval) {
        var interval_months = selectedInterval.item(0).getAttribute('data-payment-interval-length-in-months');
        if (interval_months == 0) {
            interval_months = 12;
        }
        interval = 12 / interval_months;
    }

    const elements = document.querySelectorAll('[data-price-original]');

    for (let i = 0; i < elements.length; i++) {
        const el = elements.item(i);
        const new_price = el.getAttribute('data-price-original') / interval;
        const new_price_rounded = Math.round((new_price + Number.EPSILON) * 10) / 10;
        el.setAttribute('data-price', new_price_rounded);
        el.value = String(new_price_rounded).replace(',', '').replace('.', ',');
        $(el).data('price', new_price_rounded);
    }
}
