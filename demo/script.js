// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.querySelector('.close-cart');
const overlay = document.getElementById('overlay');
const loginButtons = document.querySelectorAll('.btn-login');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const categoryTabs = document.querySelectorAll('.tab');
const addToCartButtons = document.querySelectorAll('.btn-add-cart');

// Toggle Cart Sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Toggle Login Modal
function toggleLoginModal() {
    loginModal.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Event Listeners
cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);

loginButtons.forEach(button => {
    button.addEventListener('click', toggleLoginModal);
});

closeModal.addEventListener('click', toggleLoginModal);

overlay.addEventListener('click', () => {
    if (cartSidebar.classList.contains('open')) {
        toggleCart();
    }
    if (loginModal.classList.contains('open')) {
        toggleLoginModal();
    }
});

// Category Tabs
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Here you would typically update the categories display
        // based on the selected tab (use, compound, form)
        const view = tab.getAttribute('data-view');
        console.log(`Changing to ${view} view`);
        // For demo purposes, we're not actually changing the view
    });
});

// Add to Cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.discounted-price').textContent;
        
        // Show cart items and footer
        document.querySelector('.cart-empty').style.display = 'none';
        document.querySelector('.cart-items').style.display = 'block';
        document.querySelector('.cart-footer').style.display = 'block';
        
        // Add item to cart
        const cartItems = document.querySelector('.cart-items');
        
        // Check if item already exists in cart
        const existingItem = Array.from(cartItems.querySelectorAll('.cart-item-name')).find(
            item => item.textContent === productName
        );
        
        if (existingItem) {
            // Increment quantity
            const quantityElement = existingItem.closest('.cart-item').querySelector('.cart-item-quantity');
            let quantity = parseInt(quantityElement.textContent.split(': ')[1]);
            quantityElement.textContent = `Cantidad: ${quantity + 1}`;
        } else {
            // Create new cart item
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <div class="cart-item-name">${productName}</div>
                    <div class="cart-item-price">${productPrice}</div>
                    <div class="cart-item-quantity">Cantidad: 1</div>
                </div>
                <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
            `;
            cartItems.appendChild(cartItem);
            
            // Add event listener to remove button
            cartItem.querySelector('.cart-item-remove').addEventListener('click', function() {
                cartItem.remove();
                updateCartTotal();
                
                // If cart is empty, show empty message
                if (cartItems.children.length === 0) {
                    document.querySelector('.cart-empty').style.display = 'flex';
                    document.querySelector('.cart-items').style.display = 'none';
                    document.querySelector('.cart-footer').style.display = 'none';
                }
            });
        }
        
        // Update cart total
        updateCartTotal();
        
        // Open cart
        toggleCart();
        
        // Update cart count
        updateCartCount();
    });
});

// Update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', '').replace('.', '').replace(',', '.'));
        const quantityText = item.querySelector('.cart-item-quantity').textContent;
        const quantity = parseInt(quantityText.split(': ')[1]);
        total += price * quantity;
    });
    
    document.querySelector('.total-amount').textContent = `$${formatPrice(total)}`;
}

// Update cart count
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    let count = 0;
    
    cartItems.forEach(item => {
        const quantityText = item.querySelector('.cart-item-quantity').textContent;
        const quantity = parseInt(quantityText.split(': ')[1]);
        count += quantity;
    });
    
    document.querySelector('.cart-count').textContent = count;
}

// Format price
function formatPrice(price) {
    return price.toLocaleString('es-CL');
}

// Add CSS for cart items
const style = document.createElement('style');
style.textContent = `
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid var(--gray);
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-name {
        font-weight: 500;
        margin-bottom: 5px;
    }
    
    .cart-item-price {
        color: var(--accent-color);
        font-weight: 700;
        margin-bottom: 5px;
    }
    
    .cart-item-quantity {
        font-size: 0.9rem;
        color: var(--gray-dark);
    }
    
    .cart-item-remove {
        background: none;
        border: none;
        color: var(--gray-dark);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .cart-item-remove:hover {
        color: var(--accent-color);
    }
`;
document.head.appendChild(style);

// Create placeholder images folder and dummy images
console.log('Demo initialized successfully!');
