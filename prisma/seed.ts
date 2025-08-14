import { PrismaClient, UserRole, BookingStatus, PaymentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
    const users = await prisma.user.createMany({
        data: [
        {
            id: 1,
            email: 'admin@futsal.com',
            name: 'Super Admin',
            role: UserRole.SUPER_ADMIN,
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
            phone: '+1234567890',
            password: await bcrypt.hash('admin123', 10),
            isActive: true,
            createdAt: new Date('2024-01-01T00:00:00Z'),
        },
        {
            id: 2,
            email: 'owner@futsal.com',
            name: 'Field Owner One',
            role: UserRole.FIELD_OWNER,
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
            phone: '+1234567891',
            password: await bcrypt.hash('admin123', 10),
            isActive: true,
            createdAt: new Date('2024-01-02T00:00:00Z'),
        },
        {
            id: 4,
            email: 'owner2@futsal.com',
            name: 'Field Owner Two',
            role: UserRole.FIELD_OWNER,
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
            phone: '+1234567893',
            password: await bcrypt.hash('admin123', 10),
            isActive: true,
            createdAt: new Date('2024-01-04T00:00:00Z'),
        },
        {
            id: 3,
            email: 'user@futsal.com',
            name: 'Regular User',
            role: UserRole.REGULAR_USER,
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
            phone: '+1234567892',
            password: await bcrypt.hash('admin123', 10),
            isActive: true,
            createdAt: new Date('2024-01-03T00:00:00Z'),
        },
        ],
        skipDuplicates: true,
    });

    // Seed Courts
    const courts = await prisma.court.createMany({
        data: [
        {
            id: 1,
            name: 'Premium Court A',
            description: 'High-quality synthetic grass court with professional lighting',
            image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800',
            pricePerHour: 50,
            ownerId: 2,
            facilities: ['Changing Rooms', 'Parking', 'Floodlights', 'Equipment Rental'],
            location: 'Downtown Sports Complex',
            isActive: true,
            createdAt: new Date('2024-01-15T00:00:00Z'),
        },
        {
            id: 2,
            name: 'Court B',
            description: 'Standard futsal court perfect for casual games',
            image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
            pricePerHour: 35,
            ownerId: 2,
            facilities: ['Changing Rooms', 'Parking'],
            location: 'Community Center',
            isActive: true,
            createdAt: new Date('2024-01-16T00:00:00Z'),
        },
        {
            id: 3,
            name: 'Elite Court',
            description: 'Professional-grade court with spectator seating',
            image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
            pricePerHour: 75,
            ownerId: 2,
            facilities: ['Changing Rooms', 'Parking', 'Floodlights', 'Equipment Rental', 'Spectator Seating', 'Refreshments'],
            location: 'Elite Sports Arena',
            isActive: true,
            createdAt: new Date('2024-01-17T00:00:00Z'),
        },
        {
            id: 4,
            name: 'Arena Court X',
            description: 'Modern indoor court with climate control and premium facilities',
            image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
            pricePerHour: 60,
            ownerId: 4,
            facilities: ['Changing Rooms', 'Parking', 'Air Conditioning', 'Sound System', 'CCTV Security'],
            location: 'North Side Arena',
            isActive: true,
            createdAt: new Date('2024-01-18T00:00:00Z'),
        },
        {
            id: 5,
            name: 'Training Ground Y',
            description: 'Perfect for training sessions and team practice',
            image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
            pricePerHour: 40,
            ownerId: 4,
            facilities: ['Equipment Rental', 'First Aid', 'WiFi'],
            location: 'Training Center',
            isActive: true,
            createdAt: new Date('2024-01-19T00:00:00Z'),
        },
        ],
        skipDuplicates: true,
    });

    // Seed Bookings
    const bookings = await prisma.booking.createMany({
        data: [
        {
            id: 1,
            courtId: 1,
            userId: 3,
            date: '2024-02-15',
            startTime: '18:00',
            endTime: '19:00',
            totalPrice: 50,
            status: BookingStatus.CONFIRMED,
            paymentStatus: PaymentStatus.PAID,
            createdAt: new Date('2024-02-10T00:00:00Z'),
            notes: 'Birthday celebration game',
        },
        {
            id: 2,
            courtId: 2,
            userId: 3,
            date: '2024-02-16',
            startTime: '20:00',
            endTime: '21:00',
            totalPrice: 35,
            status: BookingStatus.PENDING,
            paymentStatus: PaymentStatus.PENDING,
            createdAt: new Date('2024-02-11T00:00:00Z'),
        },
        {
            id: 3,
            courtId: 4,
            userId: 3,
            date: '2024-02-20',
            startTime: '16:00',
            endTime: '17:00',
            totalPrice: 60,
            status: BookingStatus.CONFIRMED,
            paymentStatus: PaymentStatus.PAID,
            createdAt: new Date('2024-02-12T00:00:00Z'),
            notes: 'Team practice session',
        },
        {
            id: 4,
            courtId: 5,
            userId: 3,
            date: '2024-02-22',
            startTime: '19:00',
            endTime: '20:00',
            totalPrice: 40,
            status: BookingStatus.PENDING,
            paymentStatus: PaymentStatus.PENDING,
            createdAt: new Date('2024-02-13T00:00:00Z'),
        },
        ],
        skipDuplicates: true,
    });

    console.log('Seeding finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });