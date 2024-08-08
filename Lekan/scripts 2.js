document.addEventListener("DOMContentLoaded", function() {
    // Stripe configuration
    const stripe = Stripe('your-publishable-key-here');
    const elements = stripe.elements();

    // Style for the card element
    const style = {
        base: {
            color: '#32325d',
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create and mount the card element
    const card = elements.create('card', { style: style });
    card.mount('#card-element');

    // Handle real-time validation errors from the card element
    card.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitPaymentForm();
    });

    // Create a token and submit the form
    function submitPaymentForm() {
        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Display error in the form
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Handle the token and submit the form
                handleStripeToken(result.token);
            }
        });
    }

    // Append the token to the form and submit it
    function handleStripeToken(token) {
        const form = document.getElementById('payment-form');
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        form.submit();
    }
});

