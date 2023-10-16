export const useScrollNav = () => {
    const { x, y } = useWindowScroll()
    return ref({ x, y });
}