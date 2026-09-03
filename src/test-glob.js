const modules = import.meta.glob('/public/videos/**/*.png', { eager: true });
console.log(Object.keys(modules).length);
