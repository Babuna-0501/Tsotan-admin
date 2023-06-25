
export default {
  data() {
    return {
      categories: [
        { name: 'Books', subcategories: ['Fiction', 'Non-Fiction', "Children's"] },
        { name: 'Movies', subcategories: ['Action', 'Comedy', 'Drama'] },
        { name: 'Music', subcategories: ['Rock', 'Pop', 'Hip Hop'] },
      ],
      selectedCategory: '',
      subcategories: [],
      selectedSubcategory: '',
    };
  },
  methods: {
    updateSubcategories() {
      const category = this.categories.find(c => c.name === this.selectedCategory);
      
      if (category) {
        this.subcategories = category.subcategories;
      } else {
        this.subcategories = [];
      }
      
      this.selectedSubcategory = '';
    },
  },
};
