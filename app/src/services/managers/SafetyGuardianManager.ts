
import { v4 as uuidv4 } from 'uuid';

/**
 * @file SafetyGuardianManager.ts
 * @description Pillar 15: Safety Guardian for high-risk activities.
 * This manager provides a check-in/check-out system to ensure user safety.
 */

interface MonitoredActivity {
  id: string;
  userId: string;
  activityType: string; // e.g., 'hiking', 'sailing', 'nightlife'
  description: string;
  startTime: Date;
  expectedEndTime: Date;
  status: 'active' | 'completed' | 'overdue';
  checkOutTime?: Date;
  emergencyContact?: string; 
}

class SafetyGuardianManager {
  private monitoredActivities: MonitoredActivity[] = [];
  private monitoringInterval: any = null;

  constructor() {
    this.startMonitoring();
  }

  /**
   * Starts a check-in for a high-risk activity.
   * @param userId - The user starting the activity.
   * @param activityType - The type of activity.
   * @param description - A brief description of the activity (e.g., location, companions).
   * @param durationHours - The expected duration of the activity in hours.
   * @param emergencyContact - An optional emergency contact.
   * @returns The created activity record.
   */
  public checkIn(
    userId: string,
    activityType: string,
    description: string,
    durationHours: number,
    emergencyContact?: string
  ): MonitoredActivity {
    const startTime = new Date();
    const expectedEndTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

    const newActivity: MonitoredActivity = {
      id: uuidv4(),
      userId,
      activityType,
      description,
      startTime,
      expectedEndTime,
      status: 'active',
      emergencyContact,
    };

    this.monitoredActivities.push(newActivity);
    console.log(`User ${userId} checked in for ${activityType}. Expected end: ${expectedEndTime.toLocaleTimeString()}`);
    return newActivity;
  }

  /**
   * Completes a monitored activity (check-out).
   * @param activityId - The ID of the activity to complete.
   * @returns True if the checkout was successful, false otherwise.
   */
  public checkOut(activityId: string): boolean {
    const activity = this.monitoredActivities.find(a => a.id === activityId);
    if (activity && activity.status === 'active') {
      activity.status = 'completed';
      activity.checkOutTime = new Date();
      console.log(`User ${activity.userId} checked out safely from ${activity.activityType}.`);
      return true;
    }
    return false;
  }

  /**
   * Periodically checks for overdue activities.
   */
  private checkForOverdueActivities() {
    const now = new Date();
    this.monitoredActivities.forEach(activity => {
      if (activity.status === 'active' && now > activity.expectedEndTime) {
        activity.status = 'overdue';
        this.triggerOverdueAlert(activity);
      }
    });
  }

  /**
   * Triggers an alert for an overdue activity.
   * @param activity - The overdue activity.
   */
  private triggerOverdueAlert(activity: MonitoredActivity) {
    // TODO: Implement alerting mechanism (e.g., push notification, SMS, call to emergency contact)
    console.warn(`ALERT: Activity ${activity.id} for user ${activity.userId} is overdue!`);
    console.warn(`Details: ${activity.activityType} - ${activity.description}`);
    if (activity.emergencyContact) {
      console.warn(`Notifying emergency contact: ${activity.emergencyContact}`);
    }
  }

  /**
   * Starts the background monitoring process.
   */
  public startMonitoring() {
    if (this.monitoringInterval) return;
    // Check every 5 minutes
    this.monitoringInterval = setInterval(() => this.checkForOverdueActivities(), 5 * 60 * 1000); 
    console.log("Safety Guardian monitoring started.");
  }

  /**
   * Stops the background monitoring process.
   */
  public stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log("Safety Guardian monitoring stopped.");
    }
  }
}

export default new SafetyGuardianManager();
