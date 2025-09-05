// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import Table, { TableVariants } from './Table';
import Text from '../typography/Text/Text';

const meta: Meta<typeof Table> = {
    component: Table,
    args: {
        children: [
            <>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Developer</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>Designer</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Michael Brown</td>
                        <td>Product Manager</td>
                        <td>Inactive</td>
                    </tr>
                    <tr>
                        <td>Emily Davis</td>
                        <td>QA Engineer</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Chris Wilson</td>
                        <td>DevOps</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Sarah Lee</td>
                        <td>Support</td>
                        <td>Inactive</td>
                    </tr>
                    <tr>
                        <td>David Kim</td>
                        <td>Frontend Developer</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>Linda Martinez</td>
                        <td>Backend Developer</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>James Clark</td>
                        <td>UX Researcher</td>
                        <td>Inactive</td>
                    </tr>
                    <tr>
                        <td>Olivia Turner</td>
                        <td>Scrum Master</td>
                        <td>Active</td>
                    </tr>
                </tbody>
            </>
        ],
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['bordered', 'minimal', 'lined'],
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
        },
        color: {
            control: { type: 'select' },
            options: ['base', 'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
        },
        zebra: {
            control: { type: 'boolean' },
        },
        as: {
            control: { type: 'select' },
            options: ['table'],
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
    args: {
        variant: 'minimal',
        size: 'md',
        zebra: false,
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <Text as="h3" className="mb-4 font-semibold">Minimal Variant</Text>
                <Table variant="minimal">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wireless Headphones</td>
                            <td>Electronics</td>
                            <td>$199</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Smart Watch</td>
                            <td>Electronics</td>
                            <td>$299</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Laptop Stand</td>
                            <td>Accessories</td>
                            <td>$49</td>
                            <td>40</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Lined Variant</Text>
                <Table variant="lined">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wireless Headphones</td>
                            <td>Electronics</td>
                            <td>$199</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Smart Watch</td>
                            <td>Electronics</td>
                            <td>$299</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Laptop Stand</td>
                            <td>Accessories</td>
                            <td>$49</td>
                            <td>40</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Bordered Variant</Text>
                <Table variant="bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wireless Headphones</td>
                            <td>Electronics</td>
                            <td>$199</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Smart Watch</td>
                            <td>Electronics</td>
                            <td>$299</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Laptop Stand</td>
                            <td>Accessories</td>
                            <td>$49</td>
                            <td>40</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Minimal with Zebra Stripes</Text>
                <Table variant="minimal" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wireless Headphones</td>
                            <td>Electronics</td>
                            <td>$199</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Smart Watch</td>
                            <td>Electronics</td>
                            <td>$299</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Laptop Stand</td>
                            <td>Accessories</td>
                            <td>$49</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>Bluetooth Speaker</td>
                            <td>Audio</td>
                            <td>$79</td>
                            <td>18</td>
                        </tr>
                        <tr>
                            <td>USB-C Hub</td>
                            <td>Accessories</td>
                            <td>$35</td>
                            <td>32</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Lined with Zebra Stripes</Text>
                <Table variant="lined" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wireless Headphones</td>
                            <td>Electronics</td>
                            <td>$199</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Smart Watch</td>
                            <td>Electronics</td>
                            <td>$299</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Laptop Stand</td>
                            <td>Accessories</td>
                            <td>$49</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>Bluetooth Speaker</td>
                            <td>Audio</td>
                            <td>$79</td>
                            <td>18</td>
                        </tr>
                        <tr>
                            <td>USB-C Hub</td>
                            <td>Accessories</td>
                            <td>$35</td>
                            <td>32</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Bordered with Zebra Stripes</Text>
                <Table variant="bordered" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wireless Headphones</td>
                            <td>Electronics</td>
                            <td>$199</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Smart Watch</td>
                            <td>Electronics</td>
                            <td>$299</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Laptop Stand</td>
                            <td>Accessories</td>
                            <td>$49</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>Bluetooth Speaker</td>
                            <td>Audio</td>
                            <td>$79</td>
                            <td>18</td>
                        </tr>
                        <tr>
                            <td>USB-C Hub</td>
                            <td>Accessories</td>
                            <td>$35</td>
                            <td>32</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    ),
};

export const AllColors: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <Text as="h3" className="mb-4 font-semibold">Base Color (Default)</Text>
                <Table variant="lined" color="base" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop</td>
                            <td>Electronics</td>
                            <td>$999</td>
                        </tr>
                        <tr>
                            <td>Mouse</td>
                            <td>Electronics</td>
                            <td>$25</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Primary Color</Text>
                <Table variant="lined" color="primary" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop</td>
                            <td>Electronics</td>
                            <td>$999</td>
                        </tr>
                        <tr>
                            <td>Mouse</td>
                            <td>Electronics</td>
                            <td>$25</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Success Color</Text>
                <Table variant="bordered" color="success">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop</td>
                            <td>Electronics</td>
                            <td>$999</td>
                        </tr>
                        <tr>
                            <td>Mouse</td>
                            <td>Electronics</td>
                            <td>$25</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Warning Color with Zebra</Text>
                <Table variant="minimal" color="warning" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop</td>
                            <td>Electronics</td>
                            <td>$999</td>
                        </tr>
                        <tr>
                            <td>Mouse</td>
                            <td>Electronics</td>
                            <td>$25</td>
                        </tr>
                        <tr>
                            <td>Keyboard</td>
                            <td>Electronics</td>
                            <td>$75</td>
                        </tr>
                        <tr>
                            <td>Monitor</td>
                            <td>Electronics</td>
                            <td>$250</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div>
                <Text as="h3" className="mb-4 font-semibold">Error Color</Text>
                <Table variant="bordered" color="error" zebra>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop</td>
                            <td>Electronics</td>
                            <td>$999</td>
                        </tr>
                        <tr>
                            <td>Mouse</td>
                            <td>Electronics</td>
                            <td>$25</td>
                        </tr>
                        <tr>
                            <td>Keyboard</td>
                            <td>Electronics</td>
                            <td>$75</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    ),
};

export const ColorComparison: Story = {
    render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { color: 'primary', label: 'Primary' },
                { color: 'secondary', label: 'Secondary' },
                { color: 'accent', label: 'Accent' },
                { color: 'info', label: 'Info' },
                { color: 'success', label: 'Success' },
                { color: 'warning', label: 'Warning' },
                { color: 'error', label: 'Error' },
                { color: 'neutral', label: 'Neutral' },
                { color: 'base', label: 'Base' },
            ].map(({ color, label }) => (
                <div key={color}>
                    <Text as="h4" className="mb-2 font-medium">{label}</Text>
                    <Table variant="lined" color={color as TableVariants['color']} zebra size="sm">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Task A</td>
                                <td>Done</td>
                            </tr>
                            <tr>
                                <td>Task B</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>Task C</td>
                                <td>In Progress</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    ),
};
