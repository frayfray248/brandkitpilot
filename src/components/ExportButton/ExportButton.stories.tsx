// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react";
import ExportButton from "@/components/ExportButton/ExportButton";

const meta: Meta<typeof ExportButton> = {
    component: ExportButton,
    args: {
        brandKitId: "sample-brand-kit-id",
        brandKitTitle: "My Brand Kit",
    },
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["primary", "secondary", "base"],
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg"],
        },
        brandKitId: {
            control: { type: "text" },
            description: "The ID of the brand kit to export",
        },
        brandKitTitle: {
            control: { type: "text" },
            description: "The title of the brand kit",
        },
        disabled: {
            control: { type: "boolean" },
            description: "Whether the button is disabled",
        },
        onExportStart: {
            action: "exportStart",
            description: "Callback when export starts",
        },
        onExportSuccess: {
            action: "exportSuccess",
            description: "Callback when export succeeds",
        },
        onExportError: {
            action: "exportError",
            description: "Callback when export fails",
        },
    },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A dropdown button for exporting brand kits in various formats. Supports PDF, JSON, Markdown, and plain text exports.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ExportButton>;

export const Default: Story = {
    args: {
        variant: "secondary",
        size: "md",
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="space-x-4 flex items-center">
            <ExportButton
                variant="primary"
                brandKitId="kit-1"
                brandKitTitle="Primary Export"
            />
            <ExportButton
                variant="secondary"
                brandKitId="kit-2"
                brandKitTitle="Secondary Export"
            />
            <ExportButton
                variant="base"
                brandKitId="kit-3"
                brandKitTitle="Base Export"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "ExportButton in all available color variants.",
            },
        },
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="space-x-4 flex items-center">
            <ExportButton
                size="sm"
                brandKitId="kit-sm"
                brandKitTitle="Small"
            />
            <ExportButton
                size="md"
                brandKitId="kit-md"
                brandKitTitle="Medium"
            />
            <ExportButton
                size="lg"
                brandKitId="kit-lg"
                brandKitTitle="Large"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "ExportButton in all available sizes.",
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Disabled state prevents interaction with the button.",
            },
        },
    },
};

export const InContext: Story = {
    render: () => (
        <div className="bg-base-100 p-6 rounded-lg max-w-2xl border border-base-300">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-base-content">
                        Awesome Startup Brand Kit
                    </h1>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-success text-success-content">
                        COMPLETED
                    </span>
                </div>
                <ExportButton
                    brandKitId="awesome-startup-123"
                    brandKitTitle="Awesome Startup Brand Kit"
                    variant="secondary"
                    onExportStart={(format) => console.log(`Starting ${format} export...`)}
                    onExportSuccess={(format) => console.log(`Successfully exported as ${format}`)}
                    onExportError={(err) => console.error(`Export failed: ${err}`)}
                />
            </div>
            <p className="text-base-content/70">
                Click the Export button to download your brand kit in your preferred format.
            </p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Example of ExportButton in a realistic page header context, similar to how it would appear on the results page.",
            },
        },
    },
};

export const WithCallbacks: Story = {
    args: {
        onExportStart: (format) => alert(`Starting export as ${format}...`),
        onExportSuccess: (format) => alert(`Export complete! Downloaded as ${format}`),
        onExportError: (err) => alert(`Export failed: ${err}`),
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Example with callbacks to demonstrate the export lifecycle. Click and select a format to see the callbacks in action. Note: The actual download will fail in Storybook since there is no real API.",
            },
        },
    },
};
