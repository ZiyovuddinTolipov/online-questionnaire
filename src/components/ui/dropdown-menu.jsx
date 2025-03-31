import React, { useState, useRef, useEffect } from 'react';

export function DropdownMenu({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen }}>
            {children}
        </DropdownMenuContext.Provider>
    );
}

const DropdownMenuContext = React.createContext({
    open: false,
    setOpen: () => {}
});

export const DropdownMenuTrigger = React.forwardRef(({ asChild, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    const childrenWithProps = React.cloneElement(children, {
        onClick: handleClick,
        'aria-expanded': open,
        'data-state': open ? 'open' : 'closed',
        ref, // ref'ni uzatish
        ...props
    });

    return asChild ? childrenWithProps : <button ref={ref} onClick={handleClick} {...props}>{children}</button>;
});

export function DropdownMenuContent({ align = "center", children, className = "", ...props }) {
    const { open, setOpen } = React.useContext(DropdownMenuContext);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpen]);

    if (!open) return null;

    const alignStyles = {
        start: "left-0",
        center: "left-1/2 -translate-x-1/2",
        end: "right-0"
    };

    return (
        <div
            ref={ref}
            className={`absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${alignStyles[align]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function DropdownMenuItem({ className = "", ...props }) {
    const { setOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e);
        }
        setOpen(false);
    };

    return (
        <button
            className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${className}`}
            onClick={handleClick}
            {...props}
        />
    );
}

export function DropdownMenuLabel({ className = "", ...props }) {
    return (
        <div className={`px-2 py-1.5 text-sm font-semibold ${className}`} {...props} />
    );
}

export function DropdownMenuSeparator({ className = "", ...props }) {
    return (
        <div className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />
    );
}
