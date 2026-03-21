# **DATA**

This document describes the data design of the BrandKitPilot app, covering data sources, storage providers, and the data models used throughout the application.

## **SOURCES**

| Name | Description | Type | Provider | Access |
| --- | --- | --- | --- | --- |
| App Data | Main App Data | NoSQL DB | MongoDB | Prisma ORM Behind Application Data Access Layer (DAL) |
| File Data | File storage for legal docs | File Storage | Amazon S3 | AWS S3 SDK |

## **App Data - Data Models**

All data models are defined in [`prisma/schema.prisma`](../../../prisma/schema.prisma). Refer to that file for the authoritative field definitions, types, relations, and constraints for each model.

Models included:

- **User** — User account, role, token balance, and terms acceptance
- **BrandKit** — Generated brand kit with outputs and status
- **BrandFramework** — Framework schema used to render input forms and expected output sections
- **TokenTransaction** — Record of token purchases and consumption events
## **File Storage**

File storage will be used for legal documents, Terms of Use and Privacy Policy. Documents will be stored in AWS S3 and accessed through the server (proxy) via AWS Node JS SDK.

### **Structure**

| Path | Purpose |
| --- | --- |
| `legal/terms/terms-v1.0.md` | Markdown file for Terms of Use |
| `legal/privacy/v1.0/privacy-v1.0.md` | Markdown file for Privacy Policy |
| `legal/meta.json` | Json file with meta data |

### **Meta Data**

JSON file with names to the latest legal docs.

```json
{
	"latestTerms": "terms-v1.0.md",
	"latestPrivacy": "privacy-v1.0.md"
}
```

### **Notes**

- Legal documents are reloaded on every request to reflect latest updates (no build-time caching).
