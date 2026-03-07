const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;

function parseHtml(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.html');
        
        const iframeMatch = content.match(/<iframe[^>]+src="([^"]+)"/i);
        const iframeSrc = iframeMatch ? iframeMatch[1] : null;

        return { title, iframeSrc };
    } catch (e) {
        return null;
    }
}

function processDarajah(darajahName, dirPath) {
    const subjects = [];
    if (!fs.existsSync(dirPath)) return subjects;

    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
            const subjectName = item;
            const notes = [];
            const files = fs.readdirSync(itemPath);
            for (const file of files) {
                if (file.endsWith('.html') && !file.toLowerCase().includes('main page') && !file.toLowerCase().includes('mainpage')) {
                    const parsed = parseHtml(path.join(itemPath, file));
                    if (parsed && parsed.iframeSrc) {
                        notes.push({
                            id: file.replace('.html', '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            title: parsed.title,
                            src: parsed.iframeSrc
                        });
                    }
                }
            }
            if (notes.length > 0) {
                subjects.push({
                    name: subjectName,
                    notes
                });
            }
        }
    }
    return subjects;
}

function buildIndex() {
    const index = { darajah: [] };
    const levels = [
        { name: 'Darajah Awwala', level: 1 },
        { name: 'Darajah Saniya', level: 2 },
        { name: 'Darajah Salesa', level: 3 },
        { name: 'Darajah Rabea', level: 4 },
        { name: 'Darajah Khamesa', level: 5 },
    ];

    for (const lvl of levels) {
        const dirPath = path.join(ROOT_DIR, lvl.name);
        const subjects = processDarajah(lvl.name, dirPath);
        if (subjects.length > 0) {
            index.darajah.push({
                level: lvl.level,
                name: lvl.name,
                subjects
            });
        }
    }

    fs.writeFileSync(path.join(ROOT_DIR, 'notesIndex.json'), JSON.stringify(index, null, 2));

    // Books
    const booksDir = path.join(ROOT_DIR, 'BOOKS-NOVELS');
    const books = [];
    if (fs.existsSync(booksDir)) {
        const files = fs.readdirSync(booksDir);
        for (const file of files) {
            if (file.endsWith('.html') && !file.toLowerCase().includes('main page')) {
                const parsed = parseHtml(path.join(booksDir, file));
                if (parsed && parsed.iframeSrc) {
                    books.push({
                        id: file.replace('.html', '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        title: parsed.title,
                        src: parsed.iframeSrc,
                        cover: `assets/book-covers/${file.replace('.html', '')}.png` // Guessing cover path
                    });
                }
            }
        }
    }
    fs.writeFileSync(path.join(ROOT_DIR, 'booksIndex.json'), JSON.stringify({ books }, null, 2));
    
    console.log("Indexes built successfully.");
}

buildIndex();
