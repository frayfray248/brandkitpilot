// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import FormGroup from './FormGroup';
import InputField from '@/components/form/InputField/InputField';
import CheckBox from '@/components/form/CheckBox/CheckBox';
import Button from '@/components/Button/Button';

const meta: Meta<typeof FormGroup> = {
    component: FormGroup,
    args: {
        label: 'Email Address',
        helperText: 'We will never share your email with anyone else.',
        children: [<InputField key="email" type="email" placeholder="Enter your email" fullWidth />],
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        required: {
            control: { type: 'boolean' },
        },
        fieldset: {
            control: { type: 'boolean' },
        },
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
    args: {
        size: 'md',
        required: false,
    },
};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const WithError: Story = {
    args: {
        errorMessage: 'Please enter a valid email address.',
        children: <InputField type="email" placeholder="Enter your email" color="error" fullWidth />,
    },
};

export const WithoutLabel: Story = {
    args: {
        label: undefined,
        helperText: 'This field has no label, just helper text.',
    },
};

export const WithCheckbox: Story = {
    args: {
        label: 'Preferences',
        helperText: 'Select your notification preferences.',
        fieldset: true,
        children: (
            <div className="space-y-2">
                <CheckBox text="Email notifications" color="primary" />
                <CheckBox text="SMS notifications" color="primary" />
                <CheckBox text="Push notifications" color="primary" />
            </div>
        ),
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="space-y-6">
            <FormGroup
                size="sm"
                label="Small Size"
                helperText="This is a small form group."
                required
            >
                <InputField size="sm" placeholder="Small input" fullWidth />
            </FormGroup>
            
            <FormGroup
                size="md"
                label="Medium Size"
                helperText="This is a medium form group."
                required
            >
                <InputField size="md" placeholder="Medium input" fullWidth />
            </FormGroup>
            
            <FormGroup
                size="lg"
                label="Large Size"
                helperText="This is a large form group."
                required
            >
                <InputField size="lg" placeholder="Large input" fullWidth />
            </FormGroup>
        </div>
    ),
};

export const SingleVsGroup: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-4">Single Checkbox (uses label)</h3>
                <FormGroup
                    label="Subscribe to Newsletter"
                    helperText="Get weekly updates about new features."
                >
                    <CheckBox text="Yes, I want to receive newsletters" color="primary" />
                </FormGroup>
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-4">Multiple Checkboxes (uses fieldset + legend)</h3>
                <FormGroup
                    label="Communication Preferences"
                    helperText="Select all the ways you'd like us to contact you."
                    fieldset
                    required
                >
                    <div className="space-y-2">
                        <CheckBox text="Email notifications" color="primary" />
                        <CheckBox text="SMS notifications" color="primary" />
                        <CheckBox text="Push notifications" color="primary" />
                        <CheckBox text="Phone calls" color="primary" />
                    </div>
                </FormGroup>
            </div>
        </div>
    ),
};

export const FormExample: Story = {
    render: () => (
        <form className="space-y-4 max-w-md">
            <FormGroup
                label="First Name"
                required
                errorMessage="First name is required."
            >
                <InputField placeholder="Enter your first name" color="error" fullWidth />
            </FormGroup>
            
            <FormGroup
                label="Email Address"
                helperText="We'll use this to send you important updates."
                required
            >
                <InputField type="email" placeholder="Enter your email" fullWidth />
            </FormGroup>
            
            <FormGroup
                label="Bio"
                helperText="Tell us a little about yourself (optional)."
            >
                <InputField type="textarea" placeholder="Write your bio..." fullWidth />
            </FormGroup>
            
            <FormGroup
                label="Notifications"
                helperText="Choose how you'd like to be notified."
                fieldset
            >
                <div className="space-y-2">
                    <CheckBox text="Email notifications" color="primary" />
                    <CheckBox text="SMS notifications" color="primary" />
                </div>
            </FormGroup>
            
            <Button variant="primary" size="md" className="w-full">
                Submit Form
            </Button>
        </form>
    ),
};
