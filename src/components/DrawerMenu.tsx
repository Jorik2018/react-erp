import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle, Toolbar, ToolbarButton } from '@fluentui/react-components';
import { Dismiss24Regular, FontDecrease24Regular, FontIncrease24Regular } from '@fluentui/react-icons';

const DrawerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPanel = () => setIsOpen(true);
    const dismissPanel = () => setIsOpen(false);

    return (
        <div>
            <Toolbar aria-label="Default" >
                <ToolbarButton
                    onClick={openPanel}
                    aria-label="Increase Font Size"
                    appearance="primary"
                    icon={<FontIncrease24Regular />}
                />
                <ToolbarButton
                    aria-label="Decrease Font Size"
                    icon={<FontDecrease24Regular />}
                />
            </Toolbar>
            <Drawer
                type="overlay"
                separator
                open={isOpen}
                onOpenChange={(_, { open }) => setIsOpen(open)}
            ><DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Default Drawer
            </DrawerHeaderTitle>
          </DrawerHeader>
                <DrawerBody>
                    <ul>
                        <li>
                            <Link to="/" onClick={dismissPanel}>Home</Link>
                        </li>
                        <li>
                            <Link to="/tasks" onClick={dismissPanel}>Tasks</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={dismissPanel}>Contact</Link>
                        </li>
                    </ul>
                </DrawerBody>
            </Drawer>
        </div>
    );
};

export default DrawerMenu;