import { useInView } from 'react-intersection-observer'; // Import the useInView hook

// The props of the InfiniteScrollContainer component 
interface InfiniteScrollContainerProps extends React.PropsWithChildren { // extends is used to extend the props of the component and  PropswithChildren is used to pass the children prop
    onBottomReached: () => void; // The function to call when the bottom of the container is reached
    className?: string; // The class name of the container
}

export default function InfiniteScrollContainer({
    children, // The children of the container
    onBottomReached, // The function to call when the bottom of the container is reached
    className, // The class name of the container
}: InfiniteScrollContainerProps) { // InfiniteScrollContainerProps is the type of the props
    const { ref } = useInView({ // The ref and inView from the useInView hook
        rootMargin: '200px', // The root margin of the container
        onChange(inview) { // The onChange function that is called when the inview state changes
            if (inview) { // If the container is in view
                onBottomReached(); // Call the onBottomReached function
            }
        }
    })

    return (
        <div className={className}> {/* className is used to add the class name to the container */}
            {children} {/* children is used to render the children of the container and render is the posts */}
            <div ref={ref} /> {/* ref is used to add the ref to the div element and inview is used to check if the container is in view or not */}
        </div>
    )
}