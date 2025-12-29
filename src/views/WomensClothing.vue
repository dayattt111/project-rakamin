<template>
  <div class="container">
    <div class="product-card" v-if="!loading && product">
      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-details">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-category">{{ product.category }}</p>
        <div class="product-rating">
          {{ product.rating.rate }}/5
          <span class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating.rate) }">●</span>
            <span class="empty-stars">
              <span v-for="i in (5 - Math.round(product.rating.rate))" :key="i" class="star">○</span>
            </span>
          </span>
        </div>
        <p class="product-description">{{ product.description }}</p>
        <h2 class="product-price">${{ product.price }}</h2>
        <div class="button-group">
          <button class="btn-primary" @click="buyNow">Buy now</button>
          <button class="btn-secondary" @click="nextProduct">Next product</button>
        </div>
      </div>
    </div>
    
    <div class="loader-container" v-if="loading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WomensClothing',
  data() {
    return {
      product: null,
      loading: false,
      currentIndex: 0,
      womensProductIds: []
    }
  },
  async mounted() {
    await this.loadWomensProducts()
    await this.loadProduct()
  },
  methods: {
    async loadWomensProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const products = await response.json()
        this.womensProductIds = products
          .filter(p => p.category === "women's clothing")
          .map(p => p.id)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    },
    async loadProduct() {
      if (this.womensProductIds.length === 0) return
      
      this.loading = true
      try {
        const productId = this.womensProductIds[this.currentIndex]
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        const data = await response.json()
        
        setTimeout(() => {
          this.product = data
          this.loading = false
        }, 500)
      } catch (error) {
        console.error('Error loading product:', error)
        this.loading = false
      }
    },
    nextProduct() {
      this.currentIndex = (this.currentIndex + 1) % this.womensProductIds.length
      this.loadProduct()
    },
    buyNow() {
      alert(`Purchasing ${this.product.title}`)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FDE2FF 0%, #E8D5FF 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.product-card {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  max-width: 900px;
  width: 100%;
  overflow: hidden;
}

.product-image {
  flex: 0 0 45%;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.product-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.product-details {
  flex: 1;
  padding: 50px 45px;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 26px;
  font-weight: 600;
  color: #720060;
  margin-bottom: 12px;
  line-height: 1.3;
}

.product-category {
  font-size: 15px;
  color: #666;
  margin-bottom: 8px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 16px;
}

.star.filled {
  color: #720060;
}

.empty-stars .star {
  color: #DCDCDC;
}

.product-description {
  font-size: 15px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 30px;
  flex-grow: 1;
}

.product-price {
  font-size: 32px;
  font-weight: 700;
  color: #720060;
  margin-bottom: 25px;
}

.button-group {
  display: flex;
  gap: 15px;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #720060;
  color: white;
}

.btn-primary:hover {
  background: #5a004d;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(114, 0, 96, 0.3);
}

.btn-secondary {
  background: white;
  color: #720060;
  border: 2px solid #720060;
}

.btn-secondary:hover {
  background: #720060;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(114, 0, 96, 0.3);
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loader {
  border: 6px solid #FDE2FF;
  border-top: 6px solid #720060;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
  }
  
  .product-image {
    flex: none;
    padding: 40px 20px;
  }
  
  .product-details {
    padding: 30px 25px;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style>
