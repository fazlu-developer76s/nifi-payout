import { Provider } from "../models/provider.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createProvider = async (req, res) => {
  try {
    const { name } = req.body;
    const existingProvider = await Provider.findOne({
      name: name,
      // userID: req.user.id,
    });

    if (existingProvider) {
      return errorResponse(res, "Provider already exists", 400);
    }
    const newProviderData = {
      // userID: req.user.id,
    };
    if (req.body.name) newProviderData.name = req.body.name;
    if (req.body.baseUrl) newProviderData.baseUrl = req.body.baseUrl;
    if (req.body.userName) newProviderData.userName = req.body.userName;
    if (req.body.password) newProviderData.password = req.body.password;
    if (req.body.option1) newProviderData.option1 = req.body.option1;
    if (req.body.option2) newProviderData.option2 = req.body.option2;
    if (req.body.option3) newProviderData.option3 = req.body.option3;
    if (req.body.option4) newProviderData.option4 = req.body.option4;
    if (req.body.code) newProviderData.code = req.body.code;
    if (req.body.provider_status) newProviderData.provider_status = req.body.provider_status;

    const newProvider = await Provider.create(newProviderData);

    return successResponse(
      res,
      "Provider created successfully",
      newProvider,
      201
    );
  } catch (err) {
    return errorResponse(res, "Error creating provider", 500, err.message);
  }
};

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().sort({ createdAt: -1 });
    return successResponse(
      res,
      "Providers fetched successfully",
      providers,
      200
    );
  } catch (error) {
    return errorResponse(res, "Error fetching providers", 500, error.message);
  }
};

export const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findById(id);

    if (!provider) {
      return errorResponse(res, "Provider not found", 404);
    }

    const duplicate = await Provider.findOne({
      name: req.body.name,
      _id: { $ne: id },
    });

    if (duplicate) {
      return errorResponse(res, "Provider with this name already exists", 400);
    }

    if (req.body.name) {
      provider.name = req.body.name;
    }
    if (req.body.baseUrl) {
      provider.baseUrl = req.body.baseUrl;
    }
    if (req.body.userName) {
      provider.userName = req.body.userName;
    }
    if (req.body.password) {
      provider.password = req.body.password;
    }
    if (req.body.option1) {
      provider.option1 = req.body.option1;
    }
    if (req.body.option2) {
      provider.option2 = req.body.option2;
    }
    if (req.body.option3) {
      provider.option3 = req.body.option3;
    }
    if (req.body.option4) {
      provider.option4 = req.body.option4;
    }
    if (req.body.code) {
      provider.code = req.body.code;
    }
    if (req.body.provider_status) {
      provider.provider_status = req.body.provider_status;
    }
    await provider.save();

    return successResponse(res, "Provider updated successfully", provider, 200);
  } catch (err) {
    return errorResponse(res, "Error updating provider", 500, err.message);
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const deleted = await Provider.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return errorResponse(res, "Provider not found", 404);
    }
    return successResponse(res, "Provider deleted successfully", deleted, 200);
  } catch (err) {
    return errorResponse(res, "Error deleting provider", 500, err.message);
  }
};
