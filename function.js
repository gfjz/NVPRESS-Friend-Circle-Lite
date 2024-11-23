import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 在 init_express 钩子调用的时候操作：
add_action('init_express', () => {
    // 为 fcircle 注册一个前台访问页面文件夹
    register_static_url('/fcircle', path.join(__dirname, "./fcircle/"));
    // 访问页面可以直接跳转到 index.html
    add_filter('rewrite_rules_array', arr => {
        arr.push({
            from: /\/fcircle/, to: '/fcircle/index.html'
        });
        return arr;
    });
});
