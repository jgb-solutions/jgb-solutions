import { MDXContent } from '@content-collections/mdx/react'

// Custom components available in MDX files
const components = {
  // Interactive Demo component example
  InteractiveDemo: () => (
    <div className="border-2 border-primary rounded-lg p-6 my-6 bg-primary/5">
      <h3 className="text-xl font-semibold mb-2">🎨 Interactive Demo</h3>
      <p className="text-muted-foreground">
        This is a placeholder for an interactive component. You can replace this with any React component!
      </p>
    </div>
  ),

  // Example: Code block with copy button
  CodeBlock: ({ children, language }: { children: React.ReactNode; language?: string }) => (
    <div className="relative group">
      <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
        <code className={language ? `language-${language}` : ''}>{children}</code>
      </pre>
    </div>
  ),
}

export function MdxRenderer({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}
