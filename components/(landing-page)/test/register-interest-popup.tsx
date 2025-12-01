"use client";

import { useState } from "react";
import {
  MessageSquare,
  Building2,
  MapPin,
  Home,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/styles/phone-input.css";
import { cn } from "@/lib/utils";

const mockProperties = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Beverly Hills",
    type: "Villa",
    price: "$3.2M",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Manhattan",
    type: "Apartment",
    price: "$1.8M",
  },
  {
    id: 3,
    title: "Waterfront Property",
    location: "Miami",
    type: "House",
    price: "$2.5M",
  },
  {
    id: 4,
    title: "Penthouse Suite",
    location: "Dubai",
    type: "Penthouse",
    price: "$4.7M",
  },
];

interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
}

interface FormState {
  selectedProperty: Property | null;
  whatsappNumber: string;
  isSubmitting: boolean;
}

export default function RegisterInterestPopup({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [formState, setFormState] = useState<FormState>({
    selectedProperty: null,
    whatsappNumber: "",
    isSubmitting: false,
  });
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    // Reset form state on close
    setFormState({
      selectedProperty: null,
      whatsappNumber: "",
      isSubmitting: false,
    });
  };

  const handleSubmitWhatsApp = async () => {
    if (!formState.selectedProperty || !formState.whatsappNumber) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await createUserAccountFromWhatsApp(
        formState.whatsappNumber,
        formState.selectedProperty
      );

      // Success! Close the dialog
      handleClose();

      // You might want to show a success toast here
      alert(
        "Account created successfully! Property details will be sent to your WhatsApp."
      );
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  async function createUserAccountFromWhatsApp(
    phone: string,
    property: Property
  ): Promise<void> {
    // Simulating API call - replace with your actual API endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Creating user account for:", { phone, property });

        // Here's where you'd make your actual API call:
        /*
        const response = await fetch('/api/register-interest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            whatsappNumber: phone,
            propertyId: property.id,
            propertyTitle: property.title,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create account');
        }
        
        return await response.json();
        */

        resolve();
      }, 1500);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        <DialogHeader className=" items-center sm:items-start">
          <DialogTitle className="flex items-center gap-2 ">
            <Building2 className="h-5 w-5" />
            Register Property Interest
          </DialogTitle>
          <DialogDescription>
            Search available properties, select one, and share your WhatsApp
            number to receive details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Property Selection Dropdown */}
          <div className="space-y-2">
            <Label>Select Property</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {formState.selectedProperty ? (
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">
                        {formState.selectedProperty.title}
                      </span>
                    </div>
                  ) : (
                    "Select property..."
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[460px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search properties..." />
                  <CommandList>
                    <CommandEmpty>No property found.</CommandEmpty>
                    <CommandGroup>
                      {mockProperties.map((property) => (
                        <CommandItem
                          key={property.id}
                          value={`${property.title} ${property.location} ${property.type}`}
                          onSelect={() => {
                            setFormState((prev) => ({
                              ...prev,
                              selectedProperty:
                                prev.selectedProperty?.id === property.id
                                  ? null
                                  : property,
                            }));
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formState.selectedProperty?.id === property.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col gap-1 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {property.title}
                              </span>
                              <span className="text-sm font-semibold text-primary">
                                {property.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{property.location}</span>
                              <span>• {property.type}</span>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {formState.selectedProperty && (
              <p className="text-xs text-muted-foreground">
                Selected: {formState.selectedProperty.title} -{" "}
                {formState.selectedProperty.location}
              </p>
            )}
          </div>

          {/* WhatsApp Number Input */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp-input">WhatsApp Number (UAE Only)</Label>
            <PhoneInput
              defaultCountry="ae"
              value={formState.whatsappNumber}
              onChange={(value) =>
                setFormState((prev) => ({ ...prev, whatsappNumber: value }))
              }
              className="phone-input-custom"
              inputClassName="h-11 text-sm sm:text-base"
              countrySelectorStyleProps={{
                buttonClassName: "h-11",
              }}
              disableCountryGuess
              forceDialCode
              hideDropdown={true}
              //   countries={["ae"] as any}
            />
            <p className="text-xs text-muted-foreground">
              We'll use this number to send the property PDF and follow-up
              details.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitWhatsApp}
            className="w-full gap-2"
            disabled={
              !formState.selectedProperty ||
              !formState.whatsappNumber ||
              formState.isSubmitting
            }
          >
            {formState.isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4" />
                Submit & Receive Property Details
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
