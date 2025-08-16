# Component Patterns & Best Practices

This guide provides AI-optimized documentation for using the component library effectively. These patterns ensure consistency, maintainability, and optimal developer experience when building with our components.

## Design System Principles

### Color Variants
All components follow a consistent color system with these semantic meanings and their corresponding content colors:

#### Main Colors (Backgrounds)
- **primary**: Main brand actions (CTAs, primary buttons)
- **secondary**: Supporting actions 
- **accent**: Highlights and special elements
- **neutral**: Default/subtle elements
- **base-100/200/300**: Background layers (lightest to darkest)
- **info**: Informational content
- **success**: Positive feedback/confirmation
- **warning**: Caution/attention needed
- **error**: Errors and destructive actions

#### Content Colors (Text/Foreground)
Each main color has a corresponding content color designed for optimal contrast:
- **primary-content**: Text/content color for primary backgrounds
- **secondary-content**: Text/content color for secondary backgrounds
- **accent-content**: Text/content color for accent backgrounds
- **neutral-content**: Text/content color for neutral backgrounds
- **base-content**: Text/content color for base-100/200/300 backgrounds
- **info-content**: Text/content color for info backgrounds
- **success-content**: Text/content color for success backgrounds
- **warning-content**: Text/content color for warning backgrounds
- **error-content**: Text/content color for error backgrounds

#### Color Pairing Rules
Always pair main colors with their corresponding content colors for proper contrast:
```tsx
// ✅ Correct color pairing
<Card bgColor="primary">
  <Text color="primary-content">Primary card content</Text>
</Card>

<Card bgColor="success">
  <Heading color="success-content">Success message</Heading>
</Card>

<Box bgColor="base-200">
  <Text color="base-content">Base background content</Text>
</Box>

// ❌ Incorrect color pairing
<Card bgColor="primary">
  <Text color="base-content">Wrong contrast</Text>  {/* Poor contrast */}
</Card>

<Card bgColor="error">
  <Text color="success-content">Confusing semantics</Text>  {/* Wrong meaning */}
</Card>
```

### Semantic HTML Principles
Components support semantic HTML through the `as` prop for better accessibility and SEO:
- **Box**: Can be `main`, `section`, `article`, `header`, `footer`, `nav`, `aside`
- **Stack/FlexBox**: Can be `ul`, `ol`, `nav`, `section`, or any block element
- **Text**: Can be `p`, `span`, `time`, `strong`, `em`, `label`, etc.
- **Always**: Choose the most semantically appropriate HTML element
- **Never**: Use generic `div` when a semantic element could be used

## Component Usage Patterns

### Form Composition

**Pattern**: Always wrap form controls in `FormGroup` for consistent spacing and accessibility.

```tsx
// ✅ Recommended: Complete form field with validation
<FormGroup 
  label="Email Address" 
  helperText="We'll never share your email"
  errorMessage={errors.email?.message}
  required
>
  <InputField
    type="email"
    placeholder="Enter your email"
    fullWidth
    color={errors.email ? 'error' : 'base'}
  />
</FormGroup>

// ✅ Recommended: Radio group with fieldset
<FormGroup 
  label="Notification Preferences" 
  fieldset
  required
>
  <Stack gap="2">
    <Radio name="notifications" value="email" text="Email notifications" />
    <Radio name="notifications" value="sms" text="SMS notifications" />
    <Radio name="notifications" value="none" text="No notifications" />
  </Stack>
</FormGroup>

// ❌ Avoid: Bare form controls without wrapper
<InputField type="email" placeholder="Email" />
<CheckBox text="I agree to terms" />
```

### Layout Composition

**Pattern**: Use Box as the outer container for background and spacing, with Stack/FlexBox for inner content layout. Always use semantic HTML elements through the `as` prop.

The layout system follows a clear hierarchy:
- **Box**: Provides background colors, padding, margins, and container styling
- **Stack/FlexBox**: Handle content arrangement and spacing between children
- **Semantic HTML**: Use appropriate HTML tags via `as` prop for accessibility and SEO
- **Never**: Mix Box layout props with manual spacing classes

```tsx
// ✅ Recommended: Semantic HTML with proper structure
<Box as="main" padding="6" bgColor="base-100">
  <Stack gap="6">
    <Box as="header" padding="4" bgColor="base-200">
      <Stack gap="2">
        <Heading type="h1">Dashboard</Heading>
        <Text as="p" color="base-300">Welcome back to your dashboard</Text>
      </Stack>
    </Box>
    
    <Box as="section" padding="4" bgColor="base-100" className="border border-base-300 rounded-lg">
      <Stack gap="4">
        <Heading type="h2">Recent Activity</Heading>
        <FlexBox as="ul" direction="column" gap="2" className="list-none">
          <Box as="li" padding="2">
            <Text as="span">No recent activity</Text>
          </Box>
        </FlexBox>
      </Stack>
    </Box>
  </Stack>
</Box>

// ✅ Recommended: Article layout with semantic structure
<Box as="article" padding="6" bgColor="base-100">
  <Stack gap="4">
    <Box as="header">
      <Stack gap="2">
        <Heading type="h1">Blog Post Title</Heading>
        <FlexBox items="center" gap="2">
          <Text as="time" size="sm" color="base-300" dateTime="2025-08-16">
            August 16, 2025
          </Text>
          <Badge variant="outline" size="sm">Technology</Badge>
        </FlexBox>
      </Stack>
    </Box>
    
    <Box as="section">
      <Text as="p">Article content goes here...</Text>
    </Box>
    
    <Box as="footer" padding="4" bgColor="base-200">
      <FlexBox justify="between" items="center">
        <Text as="span" size="sm">Share this post</Text>
        <FlexBox gap="2">
          <Button variant="secondary" size="sm">Twitter</Button>
          <Button variant="secondary" size="sm">LinkedIn</Button>
        </FlexBox>
      </FlexBox>
    </Box>
  </Stack>
</Box>

// ✅ Recommended: Navigation with semantic list structure
<Box as="nav" padding="4" bgColor="base-200">
  <FlexBox as="ul" gap="4" className="list-none">
    <Text as="li">
      <Button variant="base" size="sm">Home</Button>
    </Text>
    <Text as="li">
      <Button variant="base" size="sm">About</Button>
    </Text>
    <Text as="li">
      <Button variant="primary" size="sm">Contact</Button>
    </Text>
  </FlexBox>
</Box>

// ❌ Avoid: Non-semantic HTML structure
<Box padding="6" bgColor="base-200">  {/* Missing semantic 'as' prop */}
  <div>Dashboard</div>  {/* Should be h1 */}
  <div>Welcome back!</div>  {/* Should be p */}
  <div>Settings</div>  {/* Should be button or nav */}
</Box>

// ❌ Avoid: Layout components without Box wrapper when you need background/padding
<Stack gap="4" className="p-6 bg-base-200">  {/* Manual styling */}
  <Heading type="h1">Dashboard</Heading>
  <Text>Content</Text>
</Stack>

// ❌ Avoid: Manual HTML instead of semantic components
<div className="flex flex-col space-y-6 p-6 bg-base-200">
  <h1 className="text-6xl">Dashboard</h1>
  <div className="flex justify-between items-center">
    <p>Welcome back, John!</p>
    <button>Settings</button>
  </div>
</div>
```

### Status and Feedback Patterns

**Pattern**: Use Badges for status indicators and color-coded feedback.

```tsx
// ✅ Recommended: Status indicators with semantic colors
const UserStatus = ({ user }) => (
  <FlexBox items="center" gap="2">
    <Text>{user.name}</Text>
    <Badge 
      variant={user.isOnline ? 'success' : 'neutral'} 
      size="sm"
      dot 
    />
    <Badge variant="outline" size="sm">
      {user.role}
    </Badge>
  </FlexBox>
);

// ✅ Recommended: Notification counts
const NotificationIcon = ({ count }) => (
  <div className="relative">
    <Button variant="base" size="md">
      <BellIcon />
    </Button>
    {count > 0 && (
      <Badge 
        variant="error" 
        size="sm" 
        className="absolute -top-1 -right-1"
      >
        {count > 99 ? '99+' : count}
      </Badge>
    )}
  </div>
);

// ❌ Avoid: Custom status styling
<span className="inline-flex items-center gap-2">
  <span>John Doe</span>
  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
</span>
```

### Interactive Element Patterns

**Pattern**: Use appropriate button variants based on action hierarchy.

```tsx
// ✅ Recommended: Clear action hierarchy
const ActionButtons = () => (
  <FlexBox gap="3" justify="end">
    <Button variant="base" size="md">Cancel</Button>
    <Button variant="secondary" size="md">Save Draft</Button>
    <Button variant="primary" size="md">Publish</Button>
  </FlexBox>
);

// ✅ Recommended: Destructive actions
const DeleteConfirmation = () => (
  <Stack gap="4">
    <Text>Are you sure you want to delete this item?</Text>
    <FlexBox gap="3" justify="end">
      <Button variant="base">Cancel</Button>
      <Button variant="error">Delete</Button>
    </FlexBox>
  </Stack>
);

// ❌ Avoid: All buttons with same visual weight
<div>
  <Button variant="primary">Cancel</Button>
  <Button variant="primary">Save</Button>
  <Button variant="primary">Delete</Button>
</div>
```

## Advanced Patterns

### Responsive Form Layouts

```tsx
// ✅ Recommended: Responsive form with proper structure
const ContactForm = () => (
  <Stack gap="6">
    <Heading type="h2">Contact Information</Heading>
    
    <FlexBox direction="column" gap="4" className="md:flex-row">
      <FormGroup label="First Name" required className="flex-1">
        <InputField fullWidth placeholder="John" />
      </FormGroup>
      
      <FormGroup label="Last Name" required className="flex-1">
        <InputField fullWidth placeholder="Doe" />
      </FormGroup>
    </FlexBox>
    
    <FormGroup 
      label="Message" 
      helperText="Tell us how we can help"
    >
      <InputField 
        type="textarea" 
        fullWidth 
        placeholder="Your message..."
        rows={4}
      />
    </FormGroup>
    
    <FlexBox justify="end">
      <Button variant="primary" size="lg">Send Message</Button>
    </FlexBox>
  </Stack>
);
```

### Data Display with Status

```tsx
// ✅ Recommended: Semantic data display with proper HTML structure
const UserCard = ({ user }) => (
  <Box 
    as="article" 
    padding="6" 
    bgColor="base-100" 
    className="border border-base-300 rounded-lg"
  >
    <Stack gap="4">
      <Box as="header">
        <FlexBox justify="between" items="start">
          <Stack gap="1">
            <Heading type="h3">{user.name}</Heading>
            <Text as="span" color="base-300" size="sm">{user.email}</Text>
          </Stack>
          
          <FlexBox as="ul" gap="2" className="list-none">
            <Text as="li">
              <Badge 
                variant={user.status === 'active' ? 'success' : 'warning'}
                size="sm"
              >
                {user.status}
              </Badge>
            </Text>
            {user.isVerified && (
              <Text as="li">
                <Badge variant="info" size="sm">Verified</Badge>
              </Text>
            )}
          </FlexBox>
        </FlexBox>
      </Box>
      
      <Box as="footer">
        <FlexBox gap="2">
          <Button variant="primary" size="sm">Edit</Button>
          <Button variant="base" size="sm">View Profile</Button>
        </FlexBox>
      </Box>
    </Stack>
  </Box>
);

// ✅ Recommended: Product listing with semantic structure
const ProductGrid = ({ products }) => (
  <Box as="section">
    <Stack gap="6">
      <Heading type="h2">Featured Products</Heading>
      <FlexBox 
        as="ul" 
        wrap="wrap" 
        gap="4" 
        className="list-none"
      >
        {products.map(product => (
          <Box 
            as="li" 
            key={product.id}
            padding="4" 
            bgColor="base-100"
            className="border rounded-lg flex-1 min-w-64"
          >
            <Stack gap="3">
              <Text as="h3" size="lg" bold>{product.name}</Text>
              <Text as="p" color="base-300">{product.description}</Text>
              <FlexBox justify="between" items="center">
                <Text as="span" size="lg" bold color="primary">
                  ${product.price}
                </Text>
                <Button variant="primary" size="sm">Add to Cart</Button>
              </FlexBox>
            </Stack>
          </Box>
        ))}
      </FlexBox>
    </Stack>
  </Box>
);
```

## Anti-Patterns to Avoid

### ❌ Inconsistent Sizing
```tsx
// Don't mix sizes randomly
<Stack gap="2">
  <Button size="sm">Small</Button>
  <Button size="lg">Large</Button>  // Inconsistent
  <Button size="md">Medium</Button>
</Stack>
```

### ❌ Layout Component Misuse
```tsx
// Don't use Box for content layout - use Stack/FlexBox inside Box
<Box padding="4" bgColor="base-200" className="flex justify-between">
  <Text>Left content</Text>
  <Text>Right content</Text>
</Box>

// Don't skip Box when you need background/padding
<Stack gap="4" className="p-6 bg-base-200 rounded">  // Manual styling
  <Heading type="h2">Title</Heading>
  <Text>Content</Text>
</Stack>

// Don't use layout components without proper nesting
<FlexBox justify="between" className="p-4 bg-white">  // Missing Box wrapper
  <Text>Content</Text>
  <Button>Action</Button>
</FlexBox>
```

### ❌ Semantic HTML Violations
```tsx
// Don't use generic div when semantic elements exist
<Box>  {/* Should be <Box as="main"> or <Box as="section"> */}
  <Text>Article Title</Text>  {/* Should be <Heading type="h1"> */}
  <Text>Published on...</Text>  {/* Should be <Text as="time"> */}
</Box>

// Don't ignore list semantics
<Stack gap="2">  {/* Should be <Stack as="ul"> */}
  <FlexBox>  {/* Should be <Text as="li"> */}
    <Text>Item 1</Text>
  </FlexBox>
  <FlexBox>  {/* Should be <Text as="li"> */}
    <Text>Item 2</Text>
  </FlexBox>
</Stack>

// Don't use wrong semantic elements
<Box as="button" padding="4">  {/* Should use Button component */}
  Click me
</Box>

// Don't skip semantic navigation structure
<FlexBox gap="4">  {/* Should be <Box as="nav"> */}
  <Button>Home</Button>  {/* Missing list structure */}
  <Button>About</Button>
  <Button>Contact</Button>
</FlexBox>
```

### ❌ Color Misuse
```tsx
// Don't use error colors for non-error states
<Badge variant="error">New Feature</Badge>  // Confusing

// Don't ignore semantic meaning
<Button variant="success" onClick={deleteItem}>Delete</Button>  // Wrong
```

### ❌ Manual Styling Override
```tsx
// Don't override component styles manually
<Button 
  variant="primary" 
  className="bg-red-500 text-white"  // Breaks design system
>
  Submit
</Button>
```

### ❌ Accessibility Violations
```tsx
// Don't skip form labels
<InputField placeholder="Enter name" />  // No label

// Don't ignore required field indicators
<FormGroup label="Email">
  <InputField required />  // Should mark FormGroup as required
</FormGroup>
```