import React from 'react'
import { SideBarItem } from '../../../interfaces';
import { usePathname } from 'next/navigation';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { themePalette } from '@/config/theme.config';
import { ChevronRight, Remove } from '@mui/icons-material';
import Link from 'next/link';

export const MenuItem = ({ item, isOpen, onToggle }: { item: SideBarItem, isOpen: boolean, onToggle: () => void }) => {
    const pathname = usePathname();

    return (
        <>
            {item.submenu ? (
                <>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={onToggle}
                            selected={pathname.includes(item.path)}
                            sx={{
                                color: pathname.includes(item.path) ? themePalette.secondary : '#fff',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: '#fff',
                                    minWidth: 'unset',
                                    transition: 'transform 0.3s ease',
                                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                }}
                            >
                                <ChevronRight />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List disablePadding sx={{ pl: 4 }}>
                            {item.subMenuItems?.map((subItem, idx) => (
                                <Link key={idx} href={subItem.path} passHref>
                                    <ListItemButton
                                        selected={pathname === subItem.path}
                                        sx={{
                                            color: pathname === subItem.path ? themePalette.secondary : '#fff',
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#fff', minWidth: 'unset' }}>
                                            {subItem.icon || <Remove />}
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.title} />
                                    </ListItemButton>
                                </Link>
                            ))}
                        </List>
                    </Collapse>
                </>
            ) : (
                <Link href={item.path} passHref>
                    <ListItemButton
                        selected={pathname === item.path}
                        sx={{
                            color: pathname === item.path ? themePalette.secondary : '#fff',
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff', minWidth: 'unset' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                </Link>
            )}
        </>
    );
}
