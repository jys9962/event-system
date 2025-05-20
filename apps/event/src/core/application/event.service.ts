import { Injectable } from '@nestjs/common';
import { EventMakeParam } from '../domain/entity/event';
import { EventRepository } from '../domain/repository/event.repository';
import { ActivateEvent, CreateEvent, GetEvent, ListEvents } from '@common/services/event/event-app.service.method';
import { RequirementManagerGetter } from './requirements/requirement-manager.getter';

@Injectable()
export class EventService {

  constructor(
    private readonly eventRepository: EventRepository,
    private readonly requirementManagerGetter: RequirementManagerGetter,
  ) {}

  async createEvent(data: CreateEvent.CreateEventRequest): Promise<void> {
    console.log({ data });
    const manager = this.requirementManagerGetter.get(data.requirements.type);
    if (!manager.isValidPayload(data.requirements.payload)) {
      throw Error('invalid payload');
    }

    const event: EventMakeParam = {
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),
      name: data.name,
      requirementsType: data.requirements.type,
      requirementsPayload: data.requirements.payload,
    };

    await this.eventRepository.save(event);
  }


  async getEvent({ eventId }: GetEvent.GetEventRequest): Promise<void> {
    await this.eventRepository.find(eventId);
  }

  listEvents(data: ListEvents.ListEventsRequest): Promise<ListEvents.ListEventsResponse> {
    return null as any
  }


  async activateEvent({ eventId }: ActivateEvent.ActivateEventRequest) {
    const event = await this.eventRepository.find(eventId);
    if (!event) {
      throw Error();
    }

    event.activate();

    await this.eventRepository.save(event);
  }
}
