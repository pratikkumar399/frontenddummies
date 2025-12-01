export const INFINITE_SCROLL_MD = `
# Infinite Scroll Component

Implementing an infinite scroll component is a standard frontend task that tests your knowledge of the DOM, performance optimization, and asynchronous data fetching.

## Requirements
*   **Lazy Loading**: Fetch data only when the user nears the bottom of the list.
*   **Performance**: Do not attach scroll event listeners directly to the window without throttling. Ideally, use \`IntersectionObserver\`.
*   **UX**: Show a loading spinner while fetching. Handle "end of list" state.

## Implementation Strategy

### 1. The Intersection Observer API
Instead of listening to the \`scroll\` event (which fires continuously), use \`IntersectionObserver\`. This API asynchronously observes changes in the intersection of a target element with an ancestor element or the viewport.

### 2. Basic Structure
\`\`\`jsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    });
    
    if (loaderRef.current) observer.observe(loaderRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  // ... fetching logic for 'page'
}
\`\`\`

## Edge Cases
*   **Race Conditions**: Ensure that if a request is already in flight, you don't trigger another one.
*   **Virtualization**: If the list gets very long (1000+ items), the DOM size will slow down the browser. You might need "Windowing" (rendering only visible items).
`;

