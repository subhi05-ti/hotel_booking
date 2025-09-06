"use client";

import * as React from 'react';
import { Bed, Building2, Tent, Phone, Plus, Minus, Thermometer, Snowflake, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const initialLocations = [
  {
    id: 1,
    type: 'Akhada Tent',
    name: 'Juna Akhada Camp',
    location: 'Sector 5, Near Triveni Sangam',
    occupiedBeds: 80,
    totalBeds: 100,
    icon: <Tent className="h-8 w-8 text-primary" />,
    phone: '+91 123 456 7890',
  },
  {
    id: 2,
    type: 'Hotel',
    name: 'Hotel Prayag Inn',
    location: 'Civil Lines, Ujjain',
    rooms: {
      ac: { occupied: 20, total: 30 },
      nonAc: { occupied: 40, total: 45 },
    },
    get occupiedBeds() { return this.rooms.ac.occupied + this.rooms.nonAc.occupied; },
    get totalBeds() { return this.rooms.ac.total + this.rooms.nonAc.total; },
    icon: <Building2 className="h-8 w-8 text-accent" />,
    phone: '+91 987 654 3210',
  },
  {
    id: 3,
    type: 'Akhada Tent',
    name: 'Niranjani Akhada Camp',
    location: 'Sector 8, Kumbh Mela Area',
    occupiedBeds: 45,
    totalBeds: 120,
    icon: <Tent className="h-8 w-8 text-primary" />,
    phone: '+91 555 123 4567',
  },
  {
    id: 4,
    type: 'Hotel',
    name: 'Hotel Ganga View',
    location: 'Near Mahakal Temple, Ujjain',
    rooms: {
      ac: { occupied: 15, total: 25 },
      nonAc: { occupied: 30, total: 50 },
    },
    get occupiedBeds() { return this.rooms.ac.occupied + this.rooms.nonAc.occupied; },
    get totalBeds() { return this.rooms.ac.total + this.rooms.nonAc.total; },
    icon: <Building2 className="h-8 w-8 text-accent" />,
    phone: '+91 111 222 3333',
  },
  {
    id: 5,
    type: 'Akhada Tent',
    name: 'Atal Akhada Camp',
    location: 'Sector 12, Kumbh Mela Area',
    occupiedBeds: 60,
    totalBeds: 80,
    icon: <Tent className="h-8 w-8 text-primary" />,
    phone: '+91 444 555 6666',
  },
  {
    id: 6,
    type: 'Hotel',
    name: 'Hotel Triveni Palace',
    location: 'Leader Road, Ujjain',
    rooms: {
      ac: { occupied: 10, total: 20 },
      nonAc: { occupied: 25, total: 30 },
    },
    get occupiedBeds() { return this.rooms.ac.occupied + this.rooms.nonAc.occupied; },
    get totalBeds() { return this.rooms.ac.total + this.rooms.nonAc.total; },
    icon: <Building2 className="h-8 w-8 text-accent" />,
    phone: '+91 777 888 9999',
  },
  {
    id: 7,
    type: 'Akhada Tent',
    name: 'Anand Akhada Camp',
    location: 'Sector 3, Near Ganga Pujan Tent',
    occupiedBeds: 30,
    totalBeds: 50,
    icon: <Tent className="h-8 w-8 text-primary" />,
    phone: '+91 123 123 1234',
  },
  {
    id: 8,
    type: 'Hotel',
    name: 'Hotel Kumbh Residency',
    location: 'MG Marg, Ujjain',
    rooms: {
      ac: { occupied: 25, total: 40 },
      nonAc: { occupied: 50, total: 60 },
    },
    get occupiedBeds() { return this.rooms.ac.occupied + this.rooms.nonAc.occupied; },
    get totalBeds() { return this.rooms.ac.total + this.rooms.nonAc.total; },
    icon: <Building2 className="h-8 w-8 text-accent" />,
    phone: '+91 456 456 4567',
  },
  {
    id: 9,
    type: 'Akhada Tent',
    name: 'Mahanirvani Akhada Camp',
    location: 'Sector 9, Opposite Akshayavat',
    occupiedBeds: 90,
    totalBeds: 150,
    icon: <Tent className="h-8 w-8 text-primary" />,
    phone: '+91 789 789 7890',
  },
  {
    id: 10,
    type: 'Hotel',
    name: 'Hotel Sangam Paradise',
    location: 'Near Harsiddhi Temple, Ujjain',
    rooms: {
      ac: { occupied: 5, total: 15 },
      nonAc: { occupied: 10, total: 20 },
    },
    get occupiedBeds() { return this.rooms.ac.occupied + this.rooms.nonAc.occupied; },
    get totalBeds() { return this.rooms.ac.total + this.rooms.nonAc.total; },
    icon: <Building2 className="h-8 w-8 text-accent" />,
    phone: '+91 987 987 9876',
  },
  {
    id: 11,
    type: 'Akhada Tent',
    name: 'Bada Udasin Akhada Camp',
    location: 'Sector 6, Near Pontoon Bridge 3',
    occupiedBeds: 75,
    totalBeds: 90,
    icon: <Tent className="h-8 w-8 text-primary" />,
    phone: '+91 654 321 0987',
  },
];

const LocationCard = ({ locationData, onBook }) => {
  const { toast } = useToast();
  const [bedsToBook, setBedsToBook] = React.useState(1);
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [aadhaarNumber, setAadhaarNumber] = React.useState('');
  const [bookingStep, setBookingStep] = React.useState(1);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [roomType, setRoomType] = React.useState('nonAc');

  const isHotel = locationData.type === 'Hotel';
  
  const availability = isHotel 
    ? (locationData.rooms[roomType]?.total || 0) - (locationData.rooms[roomType]?.occupied || 0)
    : locationData.totalBeds - locationData.occupiedBeds;
  
  const totalBedsForOccupancy = isHotel ? locationData.totalBeds : locationData.totalBeds;
  const occupiedBedsForOccupancy = isHotel ? locationData.occupiedBeds : locationData.occupiedBeds;
  const occupancyPercentage = (occupiedBedsForOccupancy / totalBedsForOccupancy) * 100;
  const totalAvailability = locationData.totalBeds - locationData.occupiedBeds;

  const resetBookingState = () => {
    setBedsToBook(1);
    setMobileNumber('');
    setAadhaarNumber('');
    setBookingStep(1);
    setRoomType('nonAc');
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetBookingState();
    }
    setDialogOpen(open);
  }

  const handleBooking = () => {
    if (!mobileNumber.trim() || !aadhaarNumber.trim()) {
      toast({
        title: "Details Required",
        description: "Please enter your mobile and Aadhaar number.",
        variant: "destructive",
      });
      return;
    }

    onBook(locationData.id, bedsToBook, isHotel ? roomType : undefined);
    
    toast({
        variant: "success",
        title: "Booking Confirmed!",
        description: `Your booking for ${bedsToBook} bed(s)${isHotel ? ` in ${roomType === 'ac' ? 'AC' : 'Non-AC'} room` : ''} at ${locationData.name} is confirmed.`,
    });
    handleOpenChange(false);
  };

  const handleBedCountChange = (amount: number) => {
    setBedsToBook(prev => {
      const newValue = prev + amount;
      if (newValue < 1) return 1;
      if (newValue > availability) return availability;
      return newValue;
    });
  };

  React.useEffect(() => {
    if (availability < bedsToBook) {
      setBedsToBook(Math.max(1, availability));
    }
  }, [availability, bedsToBook]);

  React.useEffect(() => {
    if (isHotel) {
      setBedsToBook(1); // Reset beds to book when room type changes
    }
  }, [roomType, isHotel]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        {locationData.icon}
        <div className="grid gap-1">
          <CardTitle>{locationData.name}</CardTitle>
          <CardDescription>{locationData.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between font-medium">
            <span className='flex items-center gap-2'><Bed className="h-4 w-4 text-muted-foreground" /> Availability</span>
            <span>
              <span className="text-lg font-bold text-primary">{totalAvailability}</span>
              <span className="text-sm text-muted-foreground">/{locationData.totalBeds} Beds</span>
            </span>
          </div>
          <Progress value={occupancyPercentage} />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{locationData.occupiedBeds} Occupied</span>
            <span>{occupancyPercentage.toFixed(0)}% Full</span>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={totalAvailability === 0}>
              {totalAvailability > 0 ? 'Book Now' : 'Fully Booked'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book at {locationData.name}</DialogTitle>
              <DialogDescription>
                Follow the steps to complete your booking. Call <a href={`tel:${locationData.phone}`} className="font-semibold text-primary hover:underline">{locationData.phone}</a> for special requests.
              </DialogDescription>
            </DialogHeader>
            
            {/* Step 1: Select Room Type (Hotel) or Beds (Tent) */}
            {bookingStep === 1 && (
              <div className="grid gap-4 py-4">
                {isHotel ? (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right col-span-1">Room Type</Label>
                    <div className="col-span-3">
                      <RadioGroup defaultValue="nonAc" onValueChange={setRoomType} value={roomType} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nonAc" id="r-non-ac" />
                            <Label htmlFor="r-non-ac" className="flex items-center gap-1"><Thermometer className="w-4 h-4"/> Non-AC</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ac" id="r-ac" />
                            <Label htmlFor="r-ac" className="flex items-center gap-1"><Snowflake className="w-4 h-4" /> AC</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="beds" className="text-right">
                      Beds
                    </Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleBedCountChange(-1)} disabled={bedsToBook <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input id="beds" value={bedsToBook} readOnly className="w-16 text-center" />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleBedCountChange(1)} disabled={bedsToBook >= availability}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                <div className="text-sm text-muted-foreground col-span-4 text-center">
                  Maximum available beds for {isHotel ? (roomType === 'ac' ? 'AC' : 'Non-AC') : 'selection'}: {availability}
                </div>
              </div>
            )}

            {/* Step 2: Select beds (Hotel) or Enter Details (Tent) */}
            {bookingStep === 2 && (
              <div className="grid gap-4 py-4">
                {isHotel ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right col-span-4">
                        You have selected {roomType === 'ac' ? 'AC' : 'Non-AC'} room.
                      </Label>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="beds" className="text-right">
                        Beds
                      </Label>
                      <div className="col-span-3 flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleBedCountChange(-1)} disabled={bedsToBook <= 1}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input id="beds" value={bedsToBook} readOnly className="w-16 text-center" />
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleBedCountChange(1)} disabled={bedsToBook >= availability}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                     <div className="text-sm text-muted-foreground col-span-4 text-center">
                        Maximum available beds: {availability}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right col-span-4">
                        You are booking {bedsToBook} bed(s).
                      </Label>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mobile" className="text-right">Mobile</Label>
                      <div className="col-span-3">
                        <Input id="mobile" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Your mobile number" type="tel" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="aadhaar" className="text-right">Aadhaar</Label>
                      <div className="col-span-3">
                        <Input id="aadhaar" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="Your Aadhaar number" type="text" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Enter Details (Hotel) */}
            {isHotel && bookingStep === 3 && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right col-span-4">
                    You are booking {bedsToBook} bed(s) in {roomType === 'ac' ? 'AC' : 'Non-AC'} room.
                  </Label>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mobile" className="text-right">Mobile</Label>
                  <div className="col-span-3">
                    <Input id="mobile" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Your mobile number" type="tel" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="aadhaar" className="text-right">Aadhaar</Label>
                  <div className="col-span-3">
                    <Input id="aadhaar" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} placeholder="Your Aadhaar number" type="text" />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {bookingStep === 1 && <Button onClick={() => setBookingStep(2)} disabled={availability === 0}>Next</Button>}
              
              {bookingStep === 2 && (
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => setBookingStep(1)}>Back</Button>
                  {isHotel ? (
                    <Button onClick={() => setBookingStep(3)} disabled={availability === 0}>Next</Button>
                  ) : (
                    <Button type="submit" onClick={handleBooking}>Confirm Booking</Button>
                  )}
                </div>
              )}

              {isHotel && bookingStep === 3 && (
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => setBookingStep(2)}>Back</Button>
                  <Button type="submit" onClick={handleBooking}>Confirm Booking</Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default function AnalyzerPage() {
    const [locations, setLocations] = React.useState(initialLocations);

    const handleBooking = (locationId: number, bedsToBook: number, roomType?: string) => {
        setLocations(currentLocations => 
            currentLocations.map(loc => {
                if (loc.id === locationId) {
                    const newLoc = { ...loc };
                    if (newLoc.type === 'Hotel' && roomType && newLoc.rooms) {
                        const updatedRooms = { ...newLoc.rooms };
                        updatedRooms[roomType] = {
                            ...updatedRooms[roomType],
                            occupied: updatedRooms[roomType].occupied + bedsToBook
                        };
                        // We need to create a new object to make getters work
                        return {
                            ...newLoc,
                            rooms: updatedRooms,
                            get occupiedBeds() { return this.rooms.ac.occupied + this.rooms.nonAc.occupied; },
                            get totalBeds() { return this.rooms.ac.total + this.rooms.nonAc.total; },
                        };

                    } else if (newLoc.type === 'Akhada Tent') {
                        newLoc.occupiedBeds += bedsToBook;
                    }
                    return newLoc;
                }
                return loc;
            })
        );
    };

    const groupedLocations = locations.reduce((acc, location) => {
        const type = location.type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(location);
        return acc;
    }, {} as Record<string, typeof locations>);

    const getIconForType = (type: string) => {
        switch (type) {
            case 'Hotel':
                return <Building2 className="mr-2 h-6 w-6 text-accent" />;
            case 'Akhada Tent':
                return <Tent className="mr-2 h-6 w-6 text-primary" />;
            default:
                return null;
        }
    }

  return (
    <Accordion type="multiple" defaultValue={['Akhada Tent', 'Hotel']} className="w-full space-y-4">
        {Object.entries(groupedLocations).map(([type, locs]) => (
            <AccordionItem value={type} key={type} className="rounded-lg border bg-card px-4 text-card-foreground shadow-sm">
                <AccordionTrigger className="py-4 text-2xl font-bold tracking-tight text-foreground hover:no-underline">
                    <div className="flex items-center">
                        {getIconForType(type)}
                        {type}s
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {locs.map((loc) => (
                            <LocationCard key={loc.id} locationData={loc} onBook={handleBooking} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  );
}
