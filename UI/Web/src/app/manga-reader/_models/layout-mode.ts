/**
 * How to layout pages for reading
 */
export enum LayoutMode {
    /**
     * Renders a single page on the renderer. Cover images will follow splitting logic.
     */
    Single = 1,
    /**
     * Renders 2 pages side by side on the renderer. Cover images will not split and take up both panes.
     */
    Double = 2,
    /**
     * Renders 2 pages side by side on the renderer. Cover images will not split and take up both panes. This version reverses the order and is used for Manga only
     */
    DoubleReversed = 3,
    /**
     * Renders 2 pages side by side on the renderer. Cover images will split.
     */
    DoubleNoCover = 4,
    /**
     * Renders 2 pages side by side on the renderer. Cover images will not split. This version reverses the order and is used for Manga only
     */
    DoubleReversedNoCover = 5,
    /**
     * Renders 2 pages side by side on the renderer. Cover images will split.
     */
    DoubleFirstSingle = 6,
    /**
     * Renders 2 pages side by side on the renderer. Cover images will not split. This version reverses the order and is used for Manga only
     */
    DoubleReversedFirstSingle = 7,

}
