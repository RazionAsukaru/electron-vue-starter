export class MaintenanceReport {
    id?: string = '';
    technicianName = '';
    unitSerialNumber = '';
    unitModel = '';
    manufacturerSerialNumber = '';
    smuComponent = '';
    maintenanceDescription = '';
    woCreated: any = (new Date());
    woClosed: any = (new Date());
    maintenanceCategory = '';
}
