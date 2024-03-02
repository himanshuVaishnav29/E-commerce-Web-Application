let products = [];

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    displayProducts(); 
});

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseInt(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const productImage = document.getElementById('productImage').value;
    if (productName == '' || productDescription == '' || isNaN(productPrice) || isNaN(productQuantity)) {
        alert("Please fill out all fields correctly to add the product");
        return;
    }
    const product = {
        name: productName,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        image:productImage
    };

    products.push(product);
    saveProductsToLocalStorage();
    displayProducts();
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
    document.getElementById('productImage').value = '';
    alert("Product added successfully");
}

function displayProducts() {
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';
    let count = 0;
    products.forEach((product, index) => {
        count++;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${count}</td>
            <td>
                
                <img src="${product.image}" height="100px" width="100px">
                ${product.name}
            </td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="update-button" data-index="${index}">Update</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
    if (products.length > 0) {
        productTable.style.display = 'table';
    } else {
        productTable.style.display = 'none';
    }

    // DELETE BUTTON 
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteProduct(index);
            alert("Product deleted successfully");
        });
    });

    // UPDATE BUTTON
    const updateButtons = document.querySelectorAll('.update-button');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            openUpdateForm(index);
        });
    });
}

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProductsToLocalStorage();
    displayProducts();
}

function openUpdateForm(index) {
    const product = products[index];
    console.log("123")
    const updateForm = document.createElement('div');
    updateForm.innerHTML = `
        <span id="closeUpdateForm" onclick="closeUpdateForm()">X</span>
        <input type="text" id="newName${index}" placeholder="New Product Name">
        <input type="text" id="newDescription${index}" placeholder="New Description">
        <input type="number" id="newPrice${index}" placeholder="New Price" >
        <input type="number" id="newQuantity${index}" placeholder="New Quantity">
        <input type="text" placeholder="New Image URL" id="newImage${index}" value="${product.image}">
        <button onclick="updateProduct(${index})">Update</button>
    `;
    document.getElementById('updateFormContainer').innerHTML = '';
    document.getElementById('updateFormContainer').appendChild(updateForm);
    document.getElementById('updateFormContainer').style.display = 'block';
    updateForm.classList.add('update-form-container');
}

function closeUpdateForm() {
    document.getElementById('updateFormContainer').innerHTML = '';
    document.getElementById('updateFormContainer').style.display = 'none';
}

function updateProduct(index) {
    const newName = document.getElementById('newName' + index).value;
    const newDescription = document.getElementById('newDescription' + index).value;
    const newPrice = document.getElementById('newPrice' + index).value;
    const newQuantity = document.getElementById('newQuantity' + index).value;
    const newImage = document.getElementById('newImage' + index).value;
    if (newName == '' || newDescription == '' || isNaN(newPrice) || 
        isNaN(newQuantity) ||newPrice == '' || newQuantity=='')
     {
        alert("Please fill out all fields correctly to update the product");
        return;
    }
    products[index].name = newName;
    products[index].description = newDescription;
    products[index].price = newPrice;
    products[index].quantity = newQuantity;
    products[index].image =newImage;
    saveProductsToLocalStorage();
    displayProducts();
    closeUpdateForm();
    alert("Product updated successfully");
}
