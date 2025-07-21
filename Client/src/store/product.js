import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.imageUrl || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const data = await res.json();

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product Created Successfully." };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Something went wrong." };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${pid}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete product");

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Something went wrong." };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!res.ok) throw new Error("Failed to update product");

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((p) =>
          p._id === pid ? data.data : p
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Something went wrong." };
    }
  },
}));
