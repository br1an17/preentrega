const [, , method, resource, ...params] = process.argv;
const URL = "https://fakestoreapi.com";

//Consultar todos los productos
const getAllProducts = async () => {
  const res = await fetch(`${URL}/products`);
  const data = await res.json();
  console.log(data);
};

// Consultar un producto
const getProductById = async (id) => {
  const res = await fetch(`${URL}/products/${id}`);
  const data = await res.json();
  console.log(data);
};

// Crear un producto
const createProduct = async (title, price, category) => {
  const res = await fetch(`${URL}/products`, {
    method: "POST",
    body: JSON.stringify({ title, price: parseFloat(price), category }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
};

// eliminar un producto
const deleteProduct = async (id) => {
  const res = await fetch(`${URL}/products/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(data);
};

if (method === "GET" && resource === "products" && params.length === 0) {
  await getAllProducts();
} else if (method === "GET" && resource.startsWith("products/")) {
  const id = resource.split("/")[1];
  await getProductById(id);
} else if (method === "POST" && resource === "products") {
  const [title, price, category] = params;
  await createProduct(title, price, category);
} else if (method === "DELETE" && resource.startsWith("products/")) {
  const id = resource.split("/")[1];
  await deleteProduct(id);
} else {
  console.log("Comando no reconocido.");
}
