
$(document).ready( function() {
    $("body[data-rootcatid='4'] .oe_product").click( function( e ) {
        e.preventDefault();
    });

    setupPriceDonate();
    setupRemoveZeroDecimals();
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
