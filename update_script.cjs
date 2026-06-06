const fs = require('fs');
const path = require('path');

const creatorPath = path.join(__dirname, 'components/CreatorProfile.tsx');
const fansPath = path.join(__dirname, 'components/FansProfile.tsx');

let creatorStr = fs.readFileSync(creatorPath, 'utf8');
const fansStr = fs.readFileSync(fansPath, 'utf8');

// 1. Extract mockStories from FansProfile
const mockStoriesRegex = /const mockStories = \[\s*\{[\s\S]*?\];/m;
const mockStoriesMatch = fansStr.match(mockStoriesRegex);

// Insert mockStories into CreatorProfile
if (mockStoriesMatch && !creatorStr.includes('const mockStories = [')) {
    creatorStr = creatorStr.replace(
        /\/\/ Mock Data for Support Board \(Fan Home\)/,
        mockStoriesMatch[0] + '\n\n// Mock Data for Support Board (Fan Home)'
    );
}

// 2. Add states to CreatorProfile
const stateAddRegex = /\/\/ Dashboard & Feed Interaction states/;
if (!creatorStr.includes('const [stories, setStories] = useState(mockStories);')) {
    creatorStr = creatorStr.replace(
        stateAddRegex,
        `// Stories State & useEffect\n  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);\n  const [stories, setStories] = useState(mockStories);\n\n  useEffect(() => {\n    if (activeStoryIndex === null) return;\n    const timer = setTimeout(() => {\n      if (activeStoryIndex < stories.length - 1) {\n        const nextIndex = activeStoryIndex + 1;\n        setStories(prev => prev.map((s, i) => i === nextIndex ? { ...s, seen: true } : s));\n        setActiveStoryIndex(nextIndex);\n      } else {\n        setActiveStoryIndex(null);\n      }\n    }, 5000);\n    return () => clearTimeout(timer);\n  }, [activeStoryIndex, stories.length]);\n\n  // Dashboard & Feed Interaction states`
    );
}

// 3. Extract activeTab === 'Home' block from FansProfile
// It starts with `{activeTab === 'Home' && (` up to `)}` before `{/* Messages Tab Content */}` in FansProfile? Wait, in FansProfile it's followed by `{/* Purchase Tab Content */}`.
const fansHomeRegex = /\{activeTab === 'Home' && \([\s\S]*?(?=\s*\{\/\* (?:Purchase|Messages) Tab Content \*\/|\s*\{activeTab === 'Purchase')/;
const fansHomeMatch = fansStr.match(fansHomeRegex);

// Replace activeTab === 'Home' block in CreatorProfile
const creatorHomeRegex = /\{activeTab === 'Home' && \([\s\S]*?(?=\s*\{activeTab === 'Messages')/;
if (fansHomeMatch) {
    creatorStr = creatorStr.replace(creatorHomeRegex, fansHomeMatch[0]);
}

// 4. Extract Creator Story Viewer Dialog from FansProfile
const dialogRegex = /\{\/\* Creator Story Viewer Dialog \*\/\}[\s\S]*?(?=<\/Dialog>)\s*<\/Dialog>/;
const dialogMatch = fansStr.match(dialogRegex);

if (dialogMatch && !creatorStr.includes('Creator Story Viewer Dialog')) {
    creatorStr = creatorStr.replace(
        /    <\/div>\n<\/div>\n  \);\n\}/g,
        `\n\n${dialogMatch[0]}\n\n    </div>\n</div>\n  );\n}`
    );
}

fs.writeFileSync(creatorPath, creatorStr);
console.log('Update complete');
